import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { LoginService } from '../services/login.service';
import { LocalStorageService } from '../../local-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {



  @Output() public showElements = new EventEmitter<any>();

  submitted: boolean = false;
  loaderSubmit: boolean = false;
  invalidEmailToRegister: boolean = false;

  needConfirmationEmailCode: boolean = false;


  authentication;
  installation;
  user;

  placUserId: string;

  plac_user = {
    plac_user_name: '',
    plac_user_email: '',
    plac_user_image: 'empty'
  };

  placUserForm: FormGroup;





  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _registerService: RegisterService,
    private _loginService: LoginService,
    private _localStorageService: LocalStorageService
  ) {

    window.onbeforeunload = (ev) => {//si se refresca la pagina
      this.logout();
    };
  }

  ngOnInit() {

    this._route.queryParams
      .subscribe(result => {
        this.authentication = JSON.parse(result['authentication']);
        this.installation = JSON.parse(result['installation']);
        this.user = JSON.parse(result['user']);

        this.plac_user.plac_user_name = (this.user.displayName) ? this.user.displayName : '';
        this.plac_user.plac_user_email = (this.user.email) ? this.user.email : '';
        this.plac_user.plac_user_image = (this.user.photoURL) ? this.user.photoURL : 'empty';
        this.createForm();
      });
  }

  ngOnDestroy() {
    if (this._registerService.registerActive) {
      this.logout();
    }
  }

  //get los campos del formulario mas facil
  get f() { return this.placUserForm.controls; }

  createForm() {
    this.placUserForm = this._formBuilder.group({
      plac_user_name: [this.plac_user.plac_user_name, Validators.required],
      plac_user_email: [this.plac_user.plac_user_email, [Validators.required, Validators.email]]
    }, { updateOn: 'blur' });
  }


  submitForm() {
    this.submitted = true;
    if (this.placUserForm.status == 'VALID') {
      this.loaderSubmit = true;
      this._registerService.registerActive = false;
      this.placUserForm.value.plac_user_image = (this.user.photoURL) ? this.user.photoURL : 'empty';

      this._registerService.registerPlacUser(this.placUserForm.value, this.authentication, this.installation)
        .subscribe(result => {
          if (result.status == 'success') {
            this._registerService.registerActive = false;

            this._localStorageService.setItem('user_data', JSON.stringify(result.data));

            Swal('Muy bien', "", "success");
            this._router.navigate(['']);
          } else {
            if (result.message === "23000") {
              Swal({
                title: 'Oops...',
                text: 'Este correo ya esta registrado en plac deseas anclarlo a la cuenta ya existente',
                type: 'info',
                showCancelButton: true,
                cancelButtonText: 'Cambiar correo',
                confirmButtonText: 'Si'
              }).then(res => {
                if (res.value === true) {
                  this.loaderSubmit = true;
                  //se envia un correo con el codigo de verificacion
                  this.linkCurrentAccountWithAuth(result.data.plac_user_id);
                } else {
                  this.invalidEmailToRegister = true;
                }
              });
            } else {

              this.logout();
              Swal('Oops...', 'Algo anda mal por favor inténtalo después', 'error');
            }
          }
        }, error => {
          console.log(error);
        }, () => {
          this.loaderSubmit = false;
        });

    }
  }

  linkCurrentAccountWithAuth(plac_user_id) {
    this.placUserId = plac_user_id;
    this._registerService.linkCurrentAccountWithAuth(
      plac_user_id,
      this.f.plac_user_name.value,
      this.f.plac_user_email.value,
      this.authentication)
      .subscribe(result => {
        if (result.status == 'success') {
          this.needConfirmationEmailCode = true;
        } else {
          console.log(result);
          Swal('Oops...', 'Algo anda mal por favor inténtalo después', 'error');
        }
      }, error => {
        console.log(error);
        Swal('Oops...', 'Algo anda mal por favor inténtalo después', 'error');
      }, () => {
        this.loaderSubmit = false;
      })
  }

  verifyCode(code) {
    code = code.trim();
    if (code != '') {
      this._registerService.verifyCode(
        code,
        this.f.plac_user_email.value,
        this.placUserId,
        this.installation,
        this.authentication)
        .subscribe(result => {
          if (result.status == 'success') {
            this._localStorageService.setItem('user_data', JSON.stringify(result.data));
            Swal('Muy bien', "", "success");
            this._router.navigate(['']);
          } else {
            Swal('Oops...', result.message, 'error');
          }
        }, error => {
          console.log(error);
        })
    }
  }

  logout() {
    this._loginService.logout()
      .then(() => {
        localStorage.removeItem('user_data');
      })
      .catch(error => {
        console.log(error)
      });
  }

}

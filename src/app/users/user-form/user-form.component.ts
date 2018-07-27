import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from '../services/user.service';
import { User } from '../models/user.model.ts';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  //Id de usuario recibido por parametro de url
  idReceived = this._route.snapshot.params['id'];

  //Modelo inicial de usuario
  user: User = {
    user_id: 0,
    user_name: '',
    user_phone: ''
  };

  //Creacion del formulario 
  userForm: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    private _userService: UserService,
    private _navigate: Router) {
    
    //Creamos el formulario con el modelo inicial (Campos vacios)
    this.createForm();
  }

  createForm() {
    this.userForm = this._formBuilder.group({
      //Campos del formulario
      user_name: [this.user.user_name, Validators.required],
      user_phone: [this.user.user_phone, Validators.required],
    });
  }

  ngOnInit() {
    //Validamos la accion, si es Create o Update
    if (this.idReceived != "create") {
      //Consultamos el user que corresponde al id
      this._userService.getUser(this.idReceived).subscribe(result => {
        
        //Creamos el formulario con los datos del usuario consultado
        this.user = result[0];
        this.createForm();

      },
        error => {
          console.log(error);
        });
    }
  }


  onSubmit() {

    //Validamos el formulario, si es valido procedemos a enviar la solicitud
    if (this.userForm.status === "VALID") {
      if (this.idReceived === "create") {
        this._userService.createUser(this.userForm.value).subscribe(result => {

          Swal('Esooo', 'Usuario agregado!', 'success').then(() =>{
            this._navigate.navigate(['/users']);
          });
          

        },
          error => {
            console.log(error);
          });
      } else {
        this._userService.updateUser(this.userForm.value, this.user.user_id).subscribe(result => {
          Swal('Esooo', 'Usuario modificado!', 'success').then(() =>{
            this._navigate.navigate(['/users']);
          });
          
        },
          error => {
            console.log(error);
          });
      }
    } else {
      //Si el formulario es inavlido
      alert("Los datos del formulario son invalidos");
    }

  }

}

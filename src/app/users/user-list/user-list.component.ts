import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model.ts';
import { GlobalService } from '../../global.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  //Variables
  users: User;
  loader; //variable que gestiona si se muestra o no el loader

  constructor(private _userService: UserService, private _globalService: GlobalService) { }

  ngOnInit() {
    
    //Mostramos el loader para comenzar a hacer la solicitud
    this.loader = true;
    this._userService.getUsers().subscribe(result => {
      //Asignamos los datos a la variable de usuarios
      this.users = result;
    },
      error => {
        console.log(error);
      },
      () => {//Cuando ya la solicitud se completo ocultamos el loader
        this.loader = false;
      }
    );

  }


  deleteUser(user) {
    Swal({
      title: '¿Estas seguro de eliminar este usuario?',
      text: 'Se eliminara permanentemente esta vaina',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, quiero eliminarlo!',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {

        //Eliminamos
        this._userService.deleteUser(user.user_id).subscribe(result => {
          Swal('Esooo', 'Se elimino el usuario', 'success').then(() =>{
            this.ngOnInit();
          });
        },
          error => {
            console.log(error);
          });

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        //Proceso cancelado
        Swal('Oops...', 'Proceso cancelado', 'error')
      }
    })
  }


}

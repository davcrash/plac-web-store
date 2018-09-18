import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public afAuth: AngularFireAuth) { }

  loginWithGoogle() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(data => {
      console.log(data)
    },
  error => {
    this.showAlertError(error);
  });
  }


  loginWithFacebook() {
    this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider()).then(data => {
      console.log(data)
    },error => {
      this.showAlertError(error);
    });
  }


  logout() {
    this.afAuth.auth.signOut();
  }

  showAlertError(error){
    switch(error.code) { 
      case "auth/user-disabled": { 
        Swal('Oops...', 'Tu cuenta no esta habilitada', 'info')
         break; 
      } 
      case "auth/user-not-found": { 
        Swal('Oops...', 'Usuario no encontrado', 'info')
         break; 
      } 
      default: { 
        Swal('Oops...', 'Error desconocido', 'error')
         break; 
      } 
   } 
  }

}

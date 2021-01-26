import { Injectable } from "@angular/core";
import * as firebase from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import { GlobalService } from "../../global.service";
import { Observable, from } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  constructor(
    private _angularFireAuth: AngularFireAuth,
    private _globalService: GlobalService
  ) {}

  isLoggedIn() {
    return new Observable((s) => {
      const user = localStorage.getItem("user_data");
      if (user) {
        s.next(false);
      } else {
        s.next(true);
      }
    });
  }

  getRecaptchaVerifier(containerId: string) {
    return new firebase.auth.RecaptchaVerifier(containerId, {
      size: "invisible",
    });
  }

  loginWithPhoneNumber(phone, recaptcha) {
    return this._angularFireAuth.auth.signInWithPhoneNumber(phone, recaptcha);
  }

  manageLogIn(authentication, installation): Observable<any> {
    return new Observable((s) => {
      s.next({
        message: "user_exist",
        data: {
          uid: "asdasd",
          name: "usertest123",
          plac_user_image:
            "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png",
        },
      });
    });
  }

  getRedirectResult(): Observable<any> {
    return from(this._angularFireAuth.auth.getRedirectResult()); //retorna Observable de promesa
  }

  loginWithGoogle() {
    return this._angularFireAuth.auth.signInWithRedirect(
      new firebase.auth.GoogleAuthProvider().addScope("email")
    );
  }

  loginWithFacebook() {
    return this._angularFireAuth.auth.signInWithRedirect(
      new firebase.auth.FacebookAuthProvider().addScope("email")
    );
  }

  loginAnonymously() {
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        resolve({ uid: "asdasd" });
      }, 250);
    });
  }

  logout() {
    return new Promise<void>((r) => {
      localStorage.removeItem("user_data");
    });
  }
}

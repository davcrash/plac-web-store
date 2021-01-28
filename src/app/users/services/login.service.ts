import { Injectable } from "@angular/core";
import { GlobalService } from "../../global.service";
import { Observable, from } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  constructor(private _globalService: GlobalService) {}

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

  getRecaptchaVerifier(containerId: string) {}

  loginWithPhoneNumber(phone, recaptcha) {
    //return this._angularFireAuth.auth.signInWithPhoneNumber(phone, recaptcha);
  }

  manageLogIn(authentication, installation): Observable<any> {
    return new Observable((s) => {
      s.next({
        message: "user_exist",
        data: {
          uid: "asdasd",
          name: "usertest123",
          plac_user_image: "assets/img/profile.jpg",
        },
      });
    });
  }

  getRedirectResult(): Observable<any> {
    return new Observable();
    //return from(this._angularFireAuth.auth.getRedirectResult()); //retorna Observable de promesa
  }

  loginWithGoogle() {}

  loginWithFacebook() {}

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

import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { GlobalService } from '../../global.service';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(
        private _angularFireAuth: AngularFireAuth,
        private _globalService: GlobalService
    ) {

    }

    isLoggedIn() {
        return this._angularFireAuth.authState.pipe(map(result => {
            if (result) {
                return false;
            }
            return true;
        }));
    }

    getRecaptchaVerifier(containerId: string) {
        return new firebase.auth.RecaptchaVerifier(containerId, { 'size': 'invisible' });
    }

    loginWithPhoneNumber(phone, recaptcha) {
        return this._angularFireAuth.auth.signInWithPhoneNumber(phone, recaptcha);
    }

    manageLogIn(authentication, installation): Observable<any> {
        let body = {
            "authentication": authentication,
            "installation": installation
        };
        return this._globalService.HttpMethod("POST", "authentication/manage/login", body);
    }

    getRedirectResult(): Observable<any> {
        return from(this._angularFireAuth.auth.getRedirectResult());//retorna Observable de promesa
    }

    loginWithGoogle() {
        return this._angularFireAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider().addScope('email'));
    }


    loginWithFacebook() {
        return this._angularFireAuth.auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider().addScope('email'));
    }


    logout() {
        return this._angularFireAuth.auth.signOut();
    }

}

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {


  constructor(
    private _angularFireAuth: AngularFireAuth,
    private _router: Router,
  ) {


  }

  canActivate(): Observable<boolean> | boolean {

    return this._angularFireAuth.authState.pipe(map(result => {
      if (!(result && (localStorage.getItem('user_data')))) {

        this._router.navigate(['']);

        return false;
      }
      return true;
    }));


  }

}

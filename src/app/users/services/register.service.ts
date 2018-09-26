import { Injectable } from '@angular/core';
import { GlobalService } from '../../global.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  registerActive: boolean = false;

  constructor(private _globalService: GlobalService) { }

  registerPlacUser(placUser, authentication, installation): Observable<any> {
    let body = {
      "plac_user": placUser,
      "authentication": authentication,
      "installation": installation
    };
    return this._globalService.HttpMethod("POST", "placusers", body);
  }

  linkCurrentAccountWithAuth(placUserId, placUserName, placUserEmail, newAuth): Observable<any> {
    let body = {
      "authentication": newAuth,
      "plac_user": {
        "plac_user_id": placUserId,
        "plac_user_name": placUserName,
        "plac_user_email": placUserEmail
      }
    };
    return this._globalService.HttpMethod("POST", "authentication/account/link/auth", body);
  }

  verifyCode(code, placUserEmail, placUserId, installation, authentication): Observable<any> {
    let body = {
      "code": code,
      "email": placUserEmail,
      "plac_user_id": placUserId,
      "installation": installation,
      "authentication": authentication
    };
    return this._globalService.HttpMethod("POST", "authentication/account/verify/link/code", body);
  }


}

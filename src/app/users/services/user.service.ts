import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from '../../global.service';
import { User } from '../models/user.model.ts';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private _globalService: GlobalService
  ) { }


  getUsers(): Observable<User> {
    return this._globalService.HttpMethod("GET", "/api/getUsers");
  }

  getUser(user_id): Observable<User>{
    return this._globalService.HttpMethod("GET", "/api/getUser/"+user_id);
  }

  createUser(user): Observable<any>{
    return this._globalService.HttpMethod("POST", "/api/users/create", user);
  }

  updateUser(valueForm, user_id): Observable<any>{
    return this._globalService.HttpMethod("POST", "/api/users/update/"+user_id, valueForm)
  }

  deleteUser(user_id): Observable<any>{
    return this._globalService.HttpMethod("POST", "/api/users/delete/"+user_id);
  }

}

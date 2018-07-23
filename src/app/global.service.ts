import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(
    private _http: HttpClient
  ) { }

  getRootApiUrl() {
    return environment.rootApiUrl;
  }

  HttpMethod(action, url, params?): Observable<any> {
    
    var result;
    
    //Header de la solicitud
    let headers = new HttpHeaders({
      "Content-Type": "application/json"
    });

    //Validamos la accion y la enviamos
    if (action === "GET") {
      result = this._http.get(this.getRootApiUrl() + url, { headers: headers });
    } else if (action === "POST") {
      result = this._http.post(this.getRootApiUrl() + url, params, { headers: headers });
    }

    return result;

  }
}

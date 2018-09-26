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


  HttpMethod(action, url, params?): Observable<any> {

    var result;

    //Header de la solicitud
    let headers = new HttpHeaders({
      "Content-Type": "application/json"
    });

    //Validamos la accion y la enviamos
    if (action === "GET") {
      result = this._http.get(environment.rootApiUrl + url, { headers: headers, params });
    } else if (action === "POST") {
      result = this._http.post(environment.rootApiUrl + url, params, { headers: headers });
    }

    return result;

  }


  HttpMethodWithUrl(action, url, params?): Observable<any> {

    var result;

    //Header de la solicitud
    let headers = new HttpHeaders({
      "Content-Type": "application/json"
    });

    //Validamos la accion y la enviamos
    if (action === "GET") {
      result = this._http.get(url, { headers: headers, params });
    } else if (action === "POST") {
      result = this._http.post(url, params, { headers: headers });
    }

    return result;

  }

  HttpMethodAccesKey(url, params): Observable<any> {

    var result;

    //Header de la solicitud
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "access-key": "base64:X4IgJH07nbeiobM9KVDSIvMN1VxAgPV7wv5YKI18fpE="
    });

    result = this._http.post(environment.rootApiUrl + url, params, { headers: headers });

    return result;

  }

}

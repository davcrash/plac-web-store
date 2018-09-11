import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private storagePetSub= new Subject<any>();

  constructor() { }

  watchStorage(): Observable<any> {
      return this.storagePetSub.asObservable();
  }

  setItem(key: string, data: any) {
    localStorage.setItem(key, data);
    this.storagePetSub.next({'change':key});
  }

  removeItem(key) {
    localStorage.removeItem(key);
    this.storagePetSub.next({'remove':key});
  }
}

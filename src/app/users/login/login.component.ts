import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() public showElements = new EventEmitter<any>();

  constructor(public _loginService: LoginService) {
  }

  ngOnInit() {
    this.showElements.emit(false);
  }

  loginWithGoogle() {
    this._loginService.loginWithGoogle();
  }

  loginWithFacebook() {
    this._loginService.loginWithFacebook();
  }


  logout() {
    this._loginService.logout();
  }

}

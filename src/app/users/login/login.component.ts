import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
  AfterViewInit,
  Injector,
  NgZone,
} from "@angular/core";
import { LoginService } from "../services/login.service";
import { DeviceDetectorService } from "ngx-device-detector";
import { Router } from "@angular/router";
import { RegisterService } from "../services/register.service";
import { LocalStorageService } from "../../local-storage.service";
import swal from "sweetalert";
declare var grecaptcha: any;

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {
  @Output() public showElements = new EventEmitter<any>();

  redirectLoader: boolean = false;

  phoneNumber: string = null;
  verificationCode: string = null;

  recaptchaVerifier: any = null;
  //recaptchaIsSolved: boolean = false;
  confirmationResult: any = null;
  needConfirmationDigit: boolean = false;

  deviceInfo: any = {
    app_version: "unknown",
    device_token: "unknown",
    device_type: "",
    browser: "",
    browser_version: "",
    so_name: "",
    so_version: "",
    so_version_release: "",
  };

  constructor(
    private _loginService: LoginService,
    private _deviceService: DeviceDetectorService,
    private _router: Router,
    private _registerService: RegisterService,
    private _localStorageService: LocalStorageService,
    private injector: Injector
  ) {
    document.body.className = "sidebar-login"; //para corregir el padding del nav
    this.getDeviceInfo();
  }

  ngAfterViewInit() {
    if (!localStorage.getItem("user_data")) {
      //se carga el recaptcha
      //this.recaptchaVerifier = this._loginService.getRecaptchaVerifier('recaptcha-container');
      /*
          this.recaptchaVerifier.verify()//evento de cuando el recaptcha esta bien
            .then(result => {
              this.recaptchaIsSolved = true;
            }).catch(error => {
              console.log(error);
            });
      */
      /*  this.recaptchaVerifier.render()
        .catch(error => {
          this.recaptchaVerifier.render()
            .then(widgetId => {
              grecaptcha.reset(widgetId);
            });
          console.log(error);
        }); */
    }
  }

  ngOnInit() {
    this.showElements.emit(false);
    this.phoneNumber = null;
    this.verificationCode = null;

    if (localStorage.getItem("user_data")) {
      //si el usuario esta logueado

      this._router.navigate([""]);
    } else {
      //prender loader si viene de redireccionamiento
      if (sessionStorage.getItem("redirect")) {
        this.redirectLoader = true;

        this._loginService.getRedirectResult().subscribe(
          (resultredirect) => {
            //console.log(resultredirect.additionalUserInfo.profile.email);
            if (resultredirect.user) {
              let user = resultredirect.user;
              let placAuth = {
                user_uid: user.uid,
                authentication_type:
                  resultredirect.additionalUserInfo.providerId,
                authentication_identificator:
                  resultredirect.additionalUserInfo.profile.email,
              };
              this.verifyIfUserExist(placAuth, resultredirect);
            }
          },
          (error) => {
            this.logout();
            this.removeRedirectLoader();
            this.showAlertError(error);
            console.log(error);
          },
          () => {
            if (this.redirectLoader) {
              this.removeRedirectLoader(); //se remueve por si algo
            }
          }
        );
      } else {
        this.redirectLoader = false;
      }
    }
  }

  verifyLoginCode() {
    this.confirmationResult
      .confirm(this.verificationCode)
      .then((result) => {
        let user = result.user;
        let placAuth = {
          user_uid: user.uid,
          authentication_type: result.additionalUserInfo.providerId,
          authentication_identificator: user.phoneNumber,
        };
        this.verifyIfUserExist(placAuth, result);
      })
      .catch((error) => {
        this.showAlertError(error);
        console.log(error);
      });
  }

  verifyIfUserExist(placAuth, user) {
    this._loginService.manageLogIn(placAuth, this.deviceInfo).subscribe(
      (result) => {
        this.removeRedirectLoader();
        if (result.message == "user_not_exist") {
          let dataToRegister = {
            authentication: JSON.stringify(placAuth),
            installation: JSON.stringify(this.deviceInfo),
            user: JSON.stringify(user.user),
            additionalUserInfo: JSON.stringify(user.additionalUserInfo),
          };
          this._registerService.registerActive = true;

          let routerService = this.injector.get(Router);
          let ngZone = this.injector.get(NgZone);
          ngZone.run(() => {
            routerService.navigate(["register"], {
              queryParams: dataToRegister,
              skipLocationChange: true,
            });
          });
        } else if (result.message == "user_exist") {
          this._localStorageService.setItem(
            "user_data",
            JSON.stringify(result.data)
          );

          let goToBuy = sessionStorage.getItem("goToBuy");
          if (goToBuy) {
            sessionStorage.removeItem("goToBuy");
            let routerService = this.injector.get(Router);
            let ngZone = this.injector.get(NgZone);
            ngZone.run(() => {
              routerService.navigate(["/compra/" + goToBuy]);
            });
          } else {
            let routerService = this.injector.get(Router);
            let ngZone = this.injector.get(NgZone);
            ngZone.run(() => {
              routerService.navigate([""]);
            });
          }
        }
      },
      (error) => {
        this.logout();
        console.log(error);
      }
    );
  }

  async phoneLogin() {
    let phoneWithCountry = "+57" + this.phoneNumber;
    await this._loginService
      .loginWithPhoneNumber(phoneWithCountry, this.recaptchaVerifier)
      .then((confirmationResult) => {
        this.confirmationResult = confirmationResult;
        this.needConfirmationDigit = true;
      })
      .catch((error) => {
        console.log(error);
        this.showAlertError(error);
        this.recaptchaVerifier.render().then((widgetId) => {
          grecaptcha.reset(widgetId);
        });
      });
  }

  loginWithGoogle() {
    this.setRedirectLoader("google");
    this._loginService.loginWithGoogle().catch((error) => {
      this.removeRedirectLoader();
      this.showAlertError(error);
      console.log(error);
    });
  }

  loginWithFacebook() {
    this.setRedirectLoader("facebook");
    this._loginService.loginWithFacebook().catch((error) => {
      this.removeRedirectLoader();
      this.showAlertError(error);
      console.log(error);
    });
  }

  loginAnonymously() {
    this.redirectLoader = true;
    this._loginService
      .loginAnonymously()
      .then((result: any) => {
        let user = result;
        let placAuth = {
          user_uid: user.uid,
          authentication_type: "anonymously",
          authentication_identificator: "anonymously",
        };

        this.verifyIfUserExist(placAuth, result);
      })
      .catch((error) => {
        this.removeRedirectLoader();
        this.showAlertError(error);
        console.log(error);
      });
  }

  logout() {
    this._loginService
      .logout()
      .then(() => {
        localStorage.removeItem("user_data");
      })
      .catch((error) => {
        this.showAlertError(error);
        console.log(error);
      });
  }

  ngOnDestroy() {
    document.body.className = ""; //cuando salga del componente se restaure
  }

  getDeviceInfo() {
    let serviceReturn = this._deviceService.getDeviceInfo();
    if (this._deviceService.isDesktop()) {
      this.deviceInfo.device_type = "desktop";
    } else if (this._deviceService.isMobile()) {
      this.deviceInfo.device_type = "mobile";
    } else if (this._deviceService.isTablet()) {
      this.deviceInfo.device_type = "tablet";
    }
    this.deviceInfo.browser = serviceReturn.browser;
    this.deviceInfo.browser_version = serviceReturn.browser_version;
    this.deviceInfo.so_name = serviceReturn.os;
    this.deviceInfo.so_version = serviceReturn.os_version;
    this.deviceInfo.so_version_release = serviceReturn.os_version;
  }

  showAlertError(error) {
    switch (error.code) {
      case "auth/user-disabled": {
        swal("Oops...", "Tu cuenta no esta habilitada", "info");
        break;
      }
      case "auth/user-not-found": {
        swal("Oops...", "Usuario no encontrado", "info");
        break;
      }
      case "auth/invalid-verification-code": {
        swal("Oops...", "El codigo esta mal", "info");
        break;
      }
      case "auth/internal-error": {
        swal("Oops...", "Algo anda mal por favor inténtalo después", "info");
        break;
      }
      case "auth/code-expired": {
        swal(
          "Oops...",
          "Este código se a expirado por favor envié otro",
          "error"
        );
        break;
      }
      case "auth/invalid-phone-number": {
        swal("Oops...", "El numero de telefono no es valido", "error");
        break;
      }
      case "auth/too-many-requests": {
        swal(
          "Oops...",
          "Has echo muchas peticiones, inténtalo mas tarde",
          "error"
        );
        break;
      }
      case "auth/account-exists-with-different-credential": {
        swal(
          "Oops...",
          "Ya hay una cuenta existente con este correo electrónico pero diferente método de acceso, por favor intenta con otra cuenta",
          "info"
        );
        break;
      }
      default: {
        swal("Oops...", "Error desconocido", "error");
        break;
      }
    }
  }

  removeRedirectLoader() {
    sessionStorage.removeItem("redirect");
    this.redirectLoader = false;
  }

  setRedirectLoader(provider: string) {
    this.redirectLoader = true;
    sessionStorage.setItem(
      "redirect",
      JSON.stringify({ redirectFrom: provider })
    );
  }

  cancelVerificationCode() {
    this.phoneNumber = null;
    this.verificationCode = null;
    this.needConfirmationDigit = false;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import * as _ from "lodash";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //Almacenará mediante esta key los datos de login en session storage
  public static readonly SESSION_STORAGE_KEY: string = "apiPassport";
  message: string;
  user: any;

  constructor(private http: HttpClient, private router: Router) {
    // Creo un usuario con los datos necesarios para la sesion
    this.user = {
      access_token: "",
      user_id: "",
      rol_id: "",
      email: "",
      company_id: ""
    }
    this.message = "";
    //Si estamos logeados nos vamos a /articles
    this.rolRedirect();
  }

  /**
   * Petición de login
   * */
  public login = (email: string, password: string) => {
    //const url = "http://localhost:3021/api/login";
    const url = environment.Laravel + "login";

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(url, { 'email': email, 'password': password }, { headers: headers });
  };
  public verifyToken = (user_id: string, token: string) => {
    const url = environment.Laravel + "login";

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(url, { 'user_id': user_id, 'token': token }, { headers: headers });
  };
  /**
   * Subscripción a la petición de login, si todo es correcto, la almacena en session storage y
   * vamos a /articles. Si se produce un error lo muestra
   * */
  public loginSuscription(email: string, password: string) {
    this.login(email, password).subscribe(
      (response: any) => {
        this.message = "Login correcto";
        this.user.access_token = response.message.access_token;
        this.user.email = response.message.user.email;
        this.user.user_id = response.message.user.id;
        this.user.rol_id = response.message.rol;
        if (this.user.rol_id === 4) {

          this.user.company_id = response.message.company_id;

        }
        sessionStorage.setItem(LoginService.SESSION_STORAGE_KEY, JSON.stringify(this.user));
        this.rolRedirect();
      },
      (error) => {
        this.message = error.error.message;
      }
    );
  }


  /**
   * Comprueba si está logeado y si es así almacena los datos para poder hacer peticiones
   */
  public isUserSignedIn(): boolean {
    let isSignedIn = false;
    let userAux: any | null;
    userAux = {
      access_token: "",
      email: ""
    }
    if (!_.isEmpty(sessionStorage.getItem(LoginService.SESSION_STORAGE_KEY))) {
      isSignedIn = true;
      userAux = sessionStorage.getItem(LoginService.SESSION_STORAGE_KEY);
      userAux = JSON.parse(userAux);
      this.user = userAux;
    }
    return isSignedIn;
  }

  /**
   * Método para redirigir al usuario dependiendo de su rol
   */
  public rolRedirect() {
    if (this.isUserSignedIn())
      switch (this.user.rol_id) {
        case 1:
          this.router.navigate(['/admin/dashboard']);
          break;
        case 2:
          this.router.navigate(['/admin/dashboard']);
          break;
        case 3:
          this.router.navigate(['/alumno/dashboard']);
          break;
        case 4:
          this.router.navigate(['/empresa/dashboard']);
          break;
        default:
          break;
      }
  }

}

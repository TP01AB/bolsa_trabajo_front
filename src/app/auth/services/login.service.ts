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
  message: any;
  user: any;

  constructor(private http: HttpClient, private router: Router) {
    // Creo un usuario con los datos necesarios para la sesion


  }

  /**
   * Petición de login
   * */
  public login = (email: string, password: string) => {

    const url = environment.Laravel + "login";

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(url, { 'email': email, 'password': password }, { headers: headers });
  };




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
}

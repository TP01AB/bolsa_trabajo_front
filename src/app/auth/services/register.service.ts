import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  message: string;
  constructor(private http: HttpClient, private router: Router) { }


  //enviar peticion
  public registerUser = (email: string, password: string) => {
    const url = "http://php-fpm/api/register";

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(url, { 'email': email, 'password': password }, { headers: headers });
  };

  public registerSuscription(email: string, password: string) {
    this.registerUser(email, password).subscribe(
      (Response: any) => {
        this.message = "Registro correcto.";
        console.log(Response);
        this.router.navigate(['/home']);
      }, (error) => {
        this.message = error.error.message;
      }
    );
  }
}

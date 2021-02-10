import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  public registerUser(registerForm: FormGroup, jsonChild: String, tipo: String) {

    console.log(registerForm.value)

    let jsonForm = registerForm.getRawValue();

    let json = JSON.stringify(jsonForm);

    console.log(json);

    if(tipo == 'student') {
      console.log(jsonChild);
    }

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    /*this.http.post("http://127.0.0.1:8000/api/register", json, { headers: headers }).subscribe(
      data => console.log("success!", data),
      error => console.error("couldn't post because", error)
    )*/
  }
}

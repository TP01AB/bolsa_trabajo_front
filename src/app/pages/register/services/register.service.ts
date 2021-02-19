import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  message: string;
  userId = null;

  constructor(private http: HttpClient) { }

  public registerUser(jsonFather: string) {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    console.log(jsonFather);

    return this.http.post(environment.Laravel + "register", jsonFather, { headers: headers });
  }

  public registerChild(jsonChild: string, tipo: String) {
    console.log(jsonChild);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(environment.Laravel + tipo + "/insert", jsonChild, { headers: headers });
  }

  public getAreas() {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.get(environment.Laravel + "areas", { headers: headers });
  }

}

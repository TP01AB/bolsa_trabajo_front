import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/auth/services/login.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentProfileService {

  constructor(private http: HttpClient, private loginService: LoginService) { }

  public insertStudent(contactForm: FormGroup) {

    //console.log(this.contactForm.value)

    let jsonForm = contactForm.getRawValue();

    let json = JSON.stringify(jsonForm);

    console.log(json);

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.http.post(environment.Laravel + "insert", json, { headers: headers }).subscribe(
      data => console.log("success!", data),
      error => console.error("couldn't post because", error)
    )
  }

  public getStudent(studentId: number) {
    const url = environment.Laravel + "student/";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.loginService.user.access_token}`
    });
    return this.http.get(url + studentId, { headers: headers });
  }

  public updateStudent(contactForm: FormGroup) {

    let jsonForm = contactForm.getRawValue();

    let json = JSON.stringify(jsonForm);

    const url = environment.Laravel + "student/";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.loginService.user.access_token}`
    });
    return this.http.put(url + this.loginService.user.user_id, json, { headers: headers });
  }
}

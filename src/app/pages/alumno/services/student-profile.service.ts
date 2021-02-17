import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/auth/services/login.service';

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
    
    this.http.post("http://localhost:8000/api/student/insert", json , {headers:headers}).subscribe(
        data => console.log("success!", data),
        error => console.error("couldn't post because", error )
    )    
  }

  public getStudent(studentId: number) {
    const url = "http://localhost:3021/api/student/";
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.loginService.user.access_token}`
    });
    return this.http.get(url + studentId, { headers: headers });
  }

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class InsertStudentService {

  constructor(private http: HttpClient) { }

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

}

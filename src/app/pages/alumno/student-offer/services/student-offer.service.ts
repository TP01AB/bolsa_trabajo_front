import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/auth/services/login.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentOfferService {

  constructor(private http: HttpClient, private loginService: LoginService, private router: Router) {
    if (!loginService.isUserSignedIn()) {
      router.navigate(['/login'])
    }
  }

  public getActiveOffers = () => {
    const url = environment.Laravel + "offersActive";
    let headers = new HttpHeaders({
      Authorization: `Bearer ${this.loginService.user.access_token}`
    });
    return this.http.get(url, { headers: headers });
  };

  public getActiveInterviews = () => {
    const url = environment.Laravel + "getStudentInterview/"+this.loginService.user.student_id;
    let headers = new HttpHeaders({
      Authorization: `Bearer ${this.loginService.user.access_token}`
    });
    return this.http.get(url, { headers: headers });
  };

  public enrollOffer(offerId) {
    const url = environment.Laravel + "studentOffer";
    var data = {
      studentId: this.loginService.user.student_id,
      offerId: offerId,
      sended: 0
    };
    console.log(data);


    let headers = new HttpHeaders({
      Authorization: `Bearer ${this.loginService.user.access_token}`
    });
    return this.http.post(url, data, { headers: headers });
  }
  public getOffersInterviewCompany = (student_id:number) => {
    const url = environment.Laravel + "offersInterview/" +student_id;
    let headers = new HttpHeaders({
      Authorization: `Bearer ${this.loginService.user.access_token}`
    });
    return this.http.get(url, { headers: headers });
  };
  public getOffersInterview = () => {
    const url = environment.Laravel + "offersInterview/"+this.loginService.user.student_id;
    let headers = new HttpHeaders({
      Authorization: `Bearer ${this.loginService.user.access_token}`
    });
    return this.http.get(url, { headers: headers });
  };
  public getOffersInterviewCount = () => {
    const url = environment.Laravel + "count/offersInterview/" + this.loginService.user.student_id;
    let headers = new HttpHeaders({
      Authorization: `Bearer ${this.loginService.user.access_token}`
    });
    return this.http.get(url, { headers: headers });
  };
  public getCompany($id) {
    const url = environment.Laravel + "companyById/"+$id;
    let headers = new HttpHeaders({
      Authorization: `Bearer ${this.loginService.user.access_token}`
    });
    return this.http.get(url, { headers: headers });
  }

  public unsub($id) {
    const url = environment.Laravel + "unsubInter/"+$id;
    let headers = new HttpHeaders({
      Authorization: `Bearer ${this.loginService.user.access_token}`
    });
    return this.http.put(url, { headers: headers });
  }

  public acept($id) {
    const url = environment.Laravel + "aceptInter/"+$id;
    let headers = new HttpHeaders({
      Authorization: `Bearer ${this.loginService.user.access_token}`
    });
    return this.http.put(url, { headers: headers });
  }

}

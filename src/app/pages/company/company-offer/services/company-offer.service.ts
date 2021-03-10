import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/auth/services/login.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyOfferService {

  contactForm: FormGroup;

  constructor(private http: HttpClient, private loginService: LoginService, private router: Router) {
    // Comprobamos que el usuario este logeado sino lo redireccionamos al login
    if (!loginService.isUserSignedIn())
      router.navigate(['/login'])
  }
  public enrollOffer(offerId,student_id) {
    const url = environment.Laravel + "studentOffer";
    var data = {
      studentId: student_id,
      offerId: offerId,
      sended: 1
    };
    console.log(data);
    let headers = new HttpHeaders({
      Authorization: `Bearer ${this.loginService.user.access_token}`
    });
    return this.http.post(url, data, { headers: headers });
  }

  public getOffers = (company_id: number) => {
    const url = environment.Laravel + "offers/";
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.user.access_token}` });
    return this.http.get(url + company_id, { headers: headers });
  };
  public getCompanyOffers = (company_id: number) => {
    const url = environment.Laravel + "offersbyid/";
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.user.access_token}` });
    return this.http.get(url + company_id, { headers: headers });
  };
  public getCompanyOffersActive = (company_id: number) => {
    const url = environment.Laravel + "offersbyidActive/";
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.user.access_token}` });
    return this.http.get(url + company_id, { headers: headers });
  };

  public getCompanyDashboard = (company_id:number) => {
    const url = environment.Laravel + "company/dashboard/";
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.user.access_token}` });
    return this.http.get(url + company_id, { headers: headers });
  };
  // Guardamos una offer
  public storeOffer = (offer: any) => {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.loginService.user.access_token}`
    });

    return this.http.post(environment.Laravel + "offers", offer, { headers: headers });
  }

  // Modificamos una oferta
  public updateOffer = (offer: any) => {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.loginService.user.access_token}`
    });

    return this.http.put(environment.Laravel + "offers/" + offer.id, offer, { headers: headers });
  }

  // Método para borrar una oferta
  public deleteOffer = (id: number) => {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.loginService.user.access_token}`
    });

    return this.http.delete(environment.Laravel + "offers/" + id, { headers: headers });
  }

  // Método para coger el id de la compañia
  public getCompanyId = () => {
    const url = environment.Laravel + "companyId/" + this.loginService.user.user_id;
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.user.access_token}` });
    return this.http.get(url, { headers: headers });
  };

  // Método para traer los ciclos formativos
  public getAreas = () => {
    const url = environment.Laravel + "areas";
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.user.access_token}` });
    return this.http.get(url, { headers: headers });
  };

  public aciveOffer = (id: number) => {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: `Bearer ${this.loginService.user.access_token}` });

    return this.http.put(environment.Laravel + "offers/active/" + id, { headers: headers });
  }

  public desactiveOffer = (id: number) => {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.loginService.user.access_token}`
    });

    return this.http.put(environment.Laravel + "offers/desactive/" + id, { headers: headers });
  }

}

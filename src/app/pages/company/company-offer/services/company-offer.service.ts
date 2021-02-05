import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/auth/services/login.service';

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

  public getOffers = (company_id: number) => {
    const url = "http://php-fpm/api/offers/";
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.user.access_token}` });
    return this.http.get(url + company_id, { headers: headers });
  };

  // Guardamos una offer
  public storeOffer = (offer: any) => {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.loginService.user.access_token}`
    });

    return this.http.post("http://localhost:8000/api/offers", offer, { headers: headers });
  }

  // Modificamos una oferta
  public updateOffer = (offer: any) => {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.loginService.user.access_token}`
    });

    return this.http.put("http://localhost:8000/api/offers/" + offer.id, offer, { headers: headers });
  }

  public deleteOffer = (id: number) => {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.loginService.user.access_token}`
    });

    return this.http.delete("http://localhost:8000/api/offers/" + id, { headers: headers });
  }

  public getCompanyId = () => {
    const url = "http://localhost:8000/api/companyId/" + this.loginService.user.user_id;
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.user.access_token}` });
    return this.http.get(url, { headers: headers });
  };

  public getAreas = () => {
    const url = "http://localhost:8000/api/areas";
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.user.access_token}` });
    return this.http.get(url, { headers: headers });
  };

}

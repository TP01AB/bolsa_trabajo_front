import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/auth/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyOfferService {

  constructor(private http: HttpClient, private loginService: LoginService, private router: Router) {
    // Comprobamos que el usuario este logeado sino lo redireccionamos al login
    if (!loginService.isUserSignedIn())
      router.navigate(['/login'])
   }

   public getOffers = () => {
    const url = "http://localhost:8000/api/offers";

    console.log(this.loginService.user.access_token);
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.user.access_token}` });

    return this.http.get(url, { headers: headers });
  };

}

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

    public getOffers = () => {
        const url = "http://localhost:8000/api/offers";
        let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.user.access_token}` });
        return this.http.get(url, { headers: headers });
    };

    public storeOffer = (contactForm: FormGroup) => {

        let jsonForm = contactForm.getRawValue();

        let json = JSON.stringify(jsonForm);
        console.log(json);

        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.loginService.user.access_token}`
        });

        this.http.post("http://localhost:8000/api/offers", json, { headers: headers }).subscribe(
            data => console.log("success!", data),
            error => console.error("couldn't post because", error)
        );
    }

    public updateOffer = (contactForm: FormGroup) => {
        let jsonForm = contactForm.getRawValue();

        let json = JSON.stringify(jsonForm);
        console.log(json);

        let id = jsonForm.id;

        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.loginService.user.access_token}`
        });

        this.http.put("http://localhost:8000/api/offers/" + id, json, { headers: headers }).subscribe(
            data => console.log("success!", data),
            error => console.error("couldn't post because", error)
        );

    }


}

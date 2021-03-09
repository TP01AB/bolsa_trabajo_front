import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/auth/services/login.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class StudentDashboardService {

  constructor(private http: HttpClient, private loginService: LoginService, private router: Router) {
    if (!loginService.isUserSignedIn())
      router.navigate(['/login'])
   }

  // Método para traer los ciclos formativos
  public getNewOff = () => {
    const url = environment.Laravel + "ofertasNuevas";
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.user.access_token}` });
    return this.http.get(url, { headers: headers });
  };
}

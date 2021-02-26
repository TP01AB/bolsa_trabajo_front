import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from 'src/app/auth/services/login.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AreasAdminService {

  constructor(private http: HttpClient, private loginService: LoginService) { }

  public getAreas() {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.get(environment.Laravel + "areas", { headers: headers });
  }

  public deleteArea(id) {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.delete(environment.Laravel + "areas/"+id, { headers: headers });
  }

  public newArea(area) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.loginService.user.access_token}`
    });
    return this.http.post(environment.Laravel + "area/" + area, { headers: headers });
  }
  
}

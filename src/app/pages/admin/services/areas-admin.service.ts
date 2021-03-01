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
    console.log("delete");
    const url = environment.Laravel + "areas/"+id;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.loginService.user.access_token}`
    });

    return this.http.delete(url, { headers: headers });
  }

  public newArea(area) {
    console.log(area);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.loginService.user.access_token}`
    });
    return this.http.post(environment.Laravel + "areas/insert", area, { headers: headers });
  }

  public updateArea(area) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.loginService.user.access_token}`
    });
    return this.http.put(environment.Laravel + "areas/" + area.id, area, { headers: headers });
  }
  
}

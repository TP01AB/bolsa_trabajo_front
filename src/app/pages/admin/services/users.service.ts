import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from 'src/app/auth/services/login.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private loginService: LoginService) { }

  public getAllUsers() {
    const url = environment.Laravel + "user/get-all";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.loginService.user.access_token}`
    });
    return this.http.get(url, { headers: headers });
  }

  public deleteUser(userId) {
    const url = environment.Laravel + "user/"+userId;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.loginService.user.access_token}`
    });
    return this.http.delete(url, { headers: headers });
  }

  public updateUser(user) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.loginService.user.access_token}`
    });
    return this.http.put(environment.Laravel + "user/" + user.id, user, { headers: headers });
  }

  public userActivation(activate, userId) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.loginService.user.access_token}`
    });
    return this.http.put(environment.Laravel + "user/activate/" + userId, {activate:activate}, { headers: headers });
  }
}

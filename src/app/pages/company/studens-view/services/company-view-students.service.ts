import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/auth/services/login.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyViewStudentsService {


  constructor(private http: HttpClient, private loginService: LoginService, private router: Router) {
    // Comprobamos que el usuario este logeado sino lo redireccionamos al login
    if (!loginService.isUserSignedIn()) {
      router.navigate(['/login'])
    }
  }
  public getStudents = () => {
    const url = environment.Laravel + "student/get-all";
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.user.access_token}` });
    return this.http.get(url, { headers: headers });
  };
  public getStudentAreas = ($user_id) => {
    const url = environment.Laravel + "areas/";
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.user.access_token}` });
    return this.http.get(url + $user_id, { headers: headers });
  }
}

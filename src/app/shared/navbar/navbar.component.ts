import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/auth/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private loginService: LoginService, public router: Router) { }

  ngOnInit(): void {
  }

  isLogin(): boolean {
    let isLogin = false;
    if (this.loginService.isUserSignedIn()) {
      return true;
    }
  }

  onLogout(): void {
    sessionStorage.removeItem("apiPassport");
    this.router.navigate([''])
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/auth/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  DarkTheme: boolean;

  constructor(private loginService: LoginService, private router: Router) { }
  themeActual: any;
  rol_id;
  ngOnInit(): void {
    this.DarkTheme = localStorage.getItem('theme') === "dark" ? true : false;
    $("#themeChanger").addClass(this.DarkTheme ? "dark" : "");
    $("#themeChanger").removeClass(this.DarkTheme ? "" : "dark");
  }

  public toHome(): void {
    this.rol_id = this.loginService.user.rol_id;
    switch (this.rol_id) {
      case 1:
        this.router.navigate(['/admin/dashboard']);
        break;
      case 2:
        this.router.navigate(['/admin/dashboard']);
        break;
      case 3:
        this.router.navigate(['/alumno/dashboard']);
        break;
      case 4:
        this.router.navigate(['/empresa/dashboard']);
        break;
    }
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

  setTheme(): void {
    var label = document.getElementById("labelTheme");
  }
  storeTheme() {
    localStorage.setItem('theme', this.DarkTheme ? "dark":"" );
    this.DarkTheme = localStorage.getItem('theme') === "dark" ? true : false;
    $("#themeChanger").toggleClass(this.DarkTheme ? "dark":"" );
    $("#themeChanger").removeClass(this.DarkTheme ? "" : "dark" )
  }
}

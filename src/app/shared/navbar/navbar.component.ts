import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/auth/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  themeActual:any;
  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  
  this.themeActual = localStorage.getItem('theme');
  if(this.themeActual == null){
    this.themeActual='light';
  }
    $("#themeChanger").toggleClass(this.themeActual);
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
     this.themeActual = localStorage.getItem('theme');
    $("#themeChanger").toggleClass(this.themeActual);
    
    if (this.themeActual == 'light') {
      localStorage.setItem('theme', 'dark');
      this.themeActual = localStorage.getItem('theme');
       
    } else {
      localStorage.setItem('theme', 'light');
      this.themeActual = localStorage.getItem('theme');
      
    }
    $("#themeChanger").toggleClass(this.themeActual);
  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import * as jQuery from 'jquery';
import { LoginService } from 'src/app/auth/services/login.service';
import { CompanyProfileService } from 'src/app/pages/company/crear-perfil/services/view-profile.service';
declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private loginService: LoginService) {
    this.innerWidth = window.innerWidth;
  }
  name;
  rol_id;
  avatar;
  public innerWidth: any;
  public icon;

  ngOnInit() {

    this.avatar = this.loginService.user.avatar;
    if(this.avatar == null) {
      this.avatar = "/assets/img_profile.jpeg";
    }
    console.log("Avatar " + this.avatar);
    this.rol_id = this.loginService.user.rol_id;
    this.name = this.loginService.user.name + " " + this.loginService.user.lastnames;
    //Toggle Click Function
    $("#closeBtn").click(function (e) {
      e.preventDefault();
    });
    console.log(this.innerWidth);
    if (this.innerWidth >= 768) {
      this.icon = true;
    } else {
      this.icon = false;
    }
  }


  public navButton() {
    $("#sidebar-wrapper").toggleClass("toggled");
    $("#closeBtn").toggleClass("toggled");

    if (this.icon) {
      this.icon = false;
    } else {
      this.icon = true;
    }
  }

}

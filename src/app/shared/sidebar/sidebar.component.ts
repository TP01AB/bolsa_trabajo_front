import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';
import { LoginService } from 'src/app/auth/services/login.service';
declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  rol_id;

  ngOnInit(): void {
    this.rol_id = this.loginService.user.rol_id;
     //Toggle Click Function
     $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#sidebar-wrapper").toggleClass("toggled");
      $("#closeBtn").toggleClass("toggled");
    });
    $("#closeBtn").click(function(e) {
      e.preventDefault();
      $("#sidebar-wrapper").toggleClass("toggled");
      $("#closeBtn").toggleClass("toggled");
    });

  }

}

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

  constructor(private loginService: LoginService) { 
    this.aux = false;
  }

  aux;
  rol_id;

  ngOnInit() {
    console.log(this.aux);
    this.rol_id = this.loginService.user.rol_id;
    this.aux = true;
     //Toggle Click Function
    this.setClick();
  }

  setClick() {
    if(this.aux) {
      console.log("Preparo eventos")

      $("#menu-toggle").click(function(e) {
        
        console.log("entro");
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

}

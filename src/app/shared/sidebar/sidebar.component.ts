import { Component, OnInit, OnDestroy } from '@angular/core';
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
    this.innerWidth = window.innerWidth;
  }
  
  rol_id;
  public innerWidth: any;
  public icon;

  ngOnInit() {
      
    this.rol_id = this.loginService.user.rol_id;    
     //Toggle Click Function
     $("#closeBtn").click(function(e) {
      e.preventDefault();        
    });
    console.log(this.innerWidth);
    if(this.innerWidth >= 768) {
      this.icon = true;
    } else {
      this.icon = false;
    }
  }
  

  public navButton() {
    $("#sidebar-wrapper").toggleClass("toggled");
    $("#closeBtn").toggleClass("toggled");

    if(this.icon) {
      this.icon = false;
    } else {
      this.icon = true;
    }
  }  

}

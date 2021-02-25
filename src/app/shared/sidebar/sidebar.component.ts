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

  aux;
  rol_id;
  public innerWidth: any;
  public icon;

  ngOnInit() {
    
    console.log(this.aux);
    this.rol_id = this.loginService.user.rol_id;
    this.aux = true;
     //Toggle Click Function
     $("#closeBtn").click(function(e) {
      e.preventDefault();        
    });
    console.log(this.innerWidth);
    if(this.innerWidth >= 768) {
      this.icon = "arrow-left";
    } else {
      this.icon = "arrow-right";
    }
  }
  

  public navButton() {
    $("#sidebar-wrapper").toggleClass("toggled");
    $("#closeBtn").toggleClass("toggled");

    if(this.icon == "arrow-left") {
      this.icon = "arrow-right";
    } else {
      this.icon = "arrow-left";
    }
  }

  setClick() {
    if(this.aux) {
      console.log("Preparo eventos")            
      
    }
  }

}

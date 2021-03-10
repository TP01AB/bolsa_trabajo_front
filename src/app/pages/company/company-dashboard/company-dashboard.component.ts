import { element } from 'protractor';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/auth/services/login.service';
import { CompanyOfferService } from '../company-offer/services/company-offer.service';

@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.scss']
})
export class CompanyDashboardComponent implements OnInit {
  isLoaded = true;
  ofertaActivas: any;
  solicitudPendiente: any;
  solicitudRechazada: any;
  candidatos: any;
  candidatoRechazado: any;
  cadidatoPendiente: any;
  constructor(private Router: Router, private CompanyOffer: CompanyOfferService, private loginService: LoginService) {
    this.ofertaActivas=0;
    this.solicitudPendiente = 0;
    this.solicitudRechazada = 0;
    this.candidatos = 0;
    this.candidatoRechazado = 0;
    this.cadidatoPendiente = 0;
    this.getDashboard();
   }

  ngOnInit(): void {
  }
  getDashboard() {
    this.CompanyOffer.getCompanyDashboard(this.loginService.user.company_id).subscribe(
      (response: any) => {
        const datos = response;
        console.log(datos);
        datos.forEach((element: {
          Joined_by: any, isActive: any, interActive: any
        }) => {
          console.log(element);
          if(element.isActive==1){
            this.ofertaActivas++;
            if (element.Joined_by == 1) {

            if (element.interActive == 2) { this.solicitudRechazada++;} else
              if (element.interActive == 1) { this.candidatos++;} else
                if (element.interActive == 0) { this.solicitudPendiente++;}

          } else if (element.Joined_by == 0) {
              if (element.interActive == 2) { this.candidatoRechazado++; } else
                if (element.interActive == 1) { this.candidatos++; } else
                  if (element.interActive == 0) { this.cadidatoPendiente++; }
          }
          }
        }
        )
    this.isLoaded = true;
  },
      (error) => {
  console.log(error);
}
    )
  }
}

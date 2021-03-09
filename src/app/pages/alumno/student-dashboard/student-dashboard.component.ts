import { element } from 'protractor';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/auth/services/login.service';
import { StudentOfferService } from '../student-offer/services/student-offer.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss']
})
export class StudentDashboardComponent implements OnInit {

  rechazado: any;
  solicitudes: any;
  sinRespuesta: any;
  aceptado: any

  constructor(private Router: Router, private StudentOffer: StudentOfferService, private loginService: LoginService) {
    this.rechazado = 0;
    this.solicitudes = 0;
    this.sinRespuesta = 0;
    this.aceptado = 0;
    this.getOffers();
   };
  ngOnInit(): void {

  }
  getOffers() {
    this.StudentOffer.getOffersInterview().subscribe(
      (response: any) => {
        const offers = response;
        console.log(offers);
        offers.forEach((element: {
          id: any; name: any; vacant: any; startDate: any; endDate: any;
          description: any; area_id: any, isActive: any; area_description: any,
          companyId: any, companyName: any, Joined_by: any, interId: any,
          interActive: any
        }) => {

          console.log(element);
          if (element.Joined_by == 1) {
            console.log("entro en solicitadas por empresa");
            if (element.interActive == 2) { this.rechazado++; console.log("entro en rechazada emp"); }else
              if (element.interActive == 1) { this.aceptado++; console.log("entro en aceptada emp"); }else
                if (element.interActive == 0) { this.solicitudes++; console.log("entro en sin respuesta emp"); }

          } else if (element.Joined_by == 0) {
            if (element.interActive == 0) { this.sinRespuesta++; console.log("entro en sin respuesta");}
          }
          console.log(this.aceptado);
          console.log(this.rechazado);
          console.log(this.solicitudes);
          console.log(this.sinRespuesta);
        }
        )

      },
      (error) => {
        console.log(error);
      }

    )
  }
}

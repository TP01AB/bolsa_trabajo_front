import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/auth/services/login.service';
import { StudentOfferService } from './services/student-offer.service';

@Component({
  selector: 'app-student-offer',
  templateUrl: './student-offer.component.html',
  styleUrls: ['./student-offer.component.scss']
})
export class StudentOfferComponent implements OnInit {

  offers: any[];
  user: any;
  isLoaded = false;

  closeResult: String;

  constructor(private studentOfferService: StudentOfferService, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.getOffers(); // Obtengo todas las ofertas activas  
  }

  getOffers() {
    this.offers = [];    
    this.studentOfferService.getActiveOffers().subscribe(
      (response: any) => {
        const offers = response;
        //console.log(offers);
        offers.forEach((element: {
          id: any; name: any; vacant: any; startDate: any; endDate: any;
          description: any; area_id: any, isActive: any; area_description: any
        }) => {
          let offer = {
            'id': element.id,
            'name': element.name,
            'vacant': element.vacant,
            'startDate': element.startDate,
            'endDate': element.endDate,
            'description': element.description,
            'areaId': element.area_id,
            'isActive': element.isActive,
            'areaDescription': element.area_description
          };
          this.offers.push(offer);
        });
        this.isLoaded = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }

}

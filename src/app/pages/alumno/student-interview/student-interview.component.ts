import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/auth/services/login.service';
import { StudentOfferService } from '../student-offer/services/student-offer.service';

@Component({
  selector: 'app-student-interview',
  templateUrl: './student-interview.component.html',
  styleUrls: ['./student-interview.component.scss']
})
export class StudentInterviewComponent implements OnInit {
  
  offers: any[];
  user: any;
  isLoaded = false;
  page = 1;
  pageSize =5;

  closeResult: String;

  constructor(private modalService: NgbModal, private studentOfferService: StudentOfferService, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.getOffers();
  }

  getOffers() {
    this.offers = [];
    //Recupero las ofertas activas
    this.studentOfferService.getOffersInterview().subscribe(
      (response: any) => {
        const offers = response;
        //Recupero las ofertas a las que está apuntado el alumno
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

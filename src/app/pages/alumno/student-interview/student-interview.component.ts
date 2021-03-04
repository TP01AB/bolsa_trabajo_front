import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/auth/services/login.service';
import { CompanyDataViewComponent } from '../shared/modal/company-data-view/company-data-view.component';
import { StudentOfferService } from '../student-offer/services/student-offer.service';
import { AceptOfferModalComponent } from './modal/acept-offer-modal/acept-offer-modal.component';
import { UnsubInterModalComponent } from './modal/unsub-inter-modal/unsub-inter-modal.component';

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
  pageSize =6;

  closeResult: String;

  constructor(private modalService: NgbModal, private studentOfferService: StudentOfferService, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.getOffers();    
  }

  getOffers() {
    this.isLoaded = false;
    this.offers = [];
    //Recupero las ofertas activas
    this.studentOfferService.getOffersInterview().subscribe(
      (response: any) => {
        const offers = response;
        console.log(response);
        //Recupero las ofertas a las que está apuntado el alumno
        offers.forEach((element: {
          id: any; name: any; vacant: any; startDate: any; endDate: any;
          description: any; area_id: any, isActive: any; area_description: any,
          companyId: any, companyName: any, Joined_by: any, interId : any,
          interActive: any
        }) => {
          if(element.interActive<2) {
              let offer = {
                'id': element.id,
                'name': element.name,
                'vacant': element.vacant,
                'startDate': element.startDate,
                'endDate': element.endDate,
                'description': element.description,
                'areaId': element.area_id,
                'isActive': element.isActive,
                'areaDescription': element.area_description,
                'companyId': element.companyId,
                'companyName': element.companyName,
                'Joined_by': element.Joined_by,
                'interId': element.interId,
                'interActive': element.interActive
              };
              this.offers.push(offer);
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

  viewCompany($company_id) {
    const modalRef = this.modalService.open(CompanyDataViewComponent);
    modalRef.componentInstance.id = $company_id;
    modalRef.result.then((result) => {
      if (result) {
        console.log(result);
      }
    });    
  }

  unsubscribe(id: any) {
    const modalRef = this.modalService.open(UnsubInterModalComponent);
    modalRef.componentInstance.id = id;
    modalRef.result.then((result) => {
      if (result) {
        console.log(result);
      }
    });
    modalRef.componentInstance["unsubOk"].subscribe(event => {
      this.getOffers();
    });
  }

  acept(id: any) {
    const modalRef = this.modalService.open(AceptOfferModalComponent);
    modalRef.componentInstance.id = id;
    modalRef.result.then((result) => {
      if (result) {
        console.log(result);
      }
    });
    modalRef.componentInstance["aceptOk"].subscribe(event => {
      this.getOffers();
    });
  }

}

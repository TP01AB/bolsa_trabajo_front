import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/auth/services/login.service';
import { CompanyDataViewComponent } from '../shared/modal/company-data-view/company-data-view.component';
import { OfferEnrollComponent } from './modal/offer-enroll/offer-enroll.component';
import { StudentOfferService } from './services/student-offer.service';

@Component({
  selector: 'app-student-offer',
  templateUrl: './student-offer.component.html',
  styleUrls: ['./student-offer.component.scss']
})
export class StudentOfferComponent implements OnInit {

  searchText;

  offers: any[];
  user: any;
  isLoaded = false;
  page = 1;
  pageSize =6;
  closeResult: String;

  constructor(private modalService: NgbModal, private studentOfferService: StudentOfferService, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.getOffers();
    console.log(this.offers);
  }

  //Función que recupera las ofertas activas a las que no está apuntado el alumno
  getOffers() {
    this.offers = [];
    //Recupero las ofertas activas
    this.studentOfferService.getActiveOffers().subscribe(
      (response: any) => {
        const offers = response;
        //console.log(response);
        //Recupero las ofertas a las que está apuntado el alumno
        this.studentOfferService.getActiveInterviews().subscribe(
          (response: any) => {
            let interviews = response.data;
            //console.log(interviews);
            //Recorro el array de ofertas
            offers.forEach((element: {
              id: any; name: any; vacant: any; startDate: any; endDate: any;
              description: any; area_id: any, isActive: any; area_description: any,
              companyId: any, companyName: any
            }) => {
              var aux = false;
              var id = element.id;
              //console.log(element)
              //Compruebo si el alumno está apuntado a alguna de las ofertas recogidas
              for (var i = 0, len = interviews.length; i < len; i++) {
                //console.log('compruebo');
                if (interviews[i]['offer_id'] == id) {
                  aux = true;
                  console.log('existe');
                }
              }
              //Si el alumno no está apuntado a la oferta, guardi la oferta en el array de ofertas
              if (!aux) {
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
                  'companyName': element.companyName
                };
                this.offers.push(offer);
              }
            });
            this.isLoaded = true;
          }
        )
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Abre el modal para apuntarse a una oferta
  offerEnroll(id: number) {
    const modalRef = this.modalService.open(OfferEnrollComponent);
    modalRef.componentInstance.id = id;
    modalRef.result.then((result) => {
      if (result) {
        console.log(result);
      }
    });
    modalRef.componentInstance["enrollOk"].subscribe(event => {
      this.isLoaded = false;
      this.getOffers();
    });
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
}

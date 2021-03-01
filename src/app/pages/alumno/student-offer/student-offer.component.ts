import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/auth/services/login.service';
import { OfferEnrollComponent } from './modal/offer-enroll/offer-enroll.component';
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

  constructor(private modalService: NgbModal,private studentOfferService: StudentOfferService, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.getOffers();
  }

  //Función que recupera las ofertas activas a las que no está apuntado el alumno
  getOffers() {
    this.offers = [];    
    //Recupero las ofertas activas
    this.studentOfferService.getActiveOffers().subscribe(
      (response: any) => {
        const offers = response;
        //Recupero las ofertas a las que está apuntado el alumno
        this.studentOfferService.getActiveInterviews().subscribe(
          (response: any) => {
            let interviews = response.data;
            console.log(interviews);
            //Recorro el array de ofertas
            offers.forEach((element: {
              id: any; name: any; vacant: any; startDate: any; endDate: any;
              description: any; area_id: any, isActive: any; area_description: any
            }) => {
              var aux = false;
              var id = element.id;
              //Compruebo si el alumno está apuntado a alguna de las ofertas recogidas
              for (var i = 0, len = interviews.length; i < len; i++) {
                console.log('compruebo');                
                if(interviews[i]['offer_id'] == id) {
                  aux = true;
                  console.log('existe');
                }
              }
              //Si el alumno no está apuntado a la oferta, guardi la oferta en el array de ofertas
              if(!aux) {
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
            });
          }
        )
        this.isLoaded = true;        
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
      this.getOffers();
    });
  }

}

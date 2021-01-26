import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; // Import necesarios para los
import { OfferNewComponent } from './pop-up/offer-new/offer-new.component';
import { OfferUpdateComponent } from './pop-up/offer-update/offer-update.component';

@Component({
  selector: 'app-company-offer',
  templateUrl: './company-offer.component.html',
  styleUrls: ['./company-offer.component.scss']
})
export class CompanyOfferComponent implements OnInit {

  closeResult: String;
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  // Abre el modal para crear una nueva oferta
  offerNew() {
    const modalRef = this.modalService.open(OfferNewComponent);
  }

  offerUpdate(offer){
    console.log('oferta en el ts del company offer: ' + offer);
    
    const modalRef = this.modalService.open(OfferUpdateComponent);
    modalRef.componentInstance.offer = offer;
    modalRef.result.then((result) => {
      if (result) {
        console.log(result);
      }
    });
  }

}

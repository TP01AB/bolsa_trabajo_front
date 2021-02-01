import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OfferModalComponent } from './offer-modal/offer-modal.component';

@Component({
  selector: 'app-student-offer-view',
  templateUrl: './student-offer-view.component.html',
  styleUrls: ['./student-offer-view.component.scss']
})
export class StudentOfferViewComponent implements OnInit {

  constructor(private modalService: NgbModal) {}
  ngOnInit(): void {
        
  }

  open(company) {
    const modalRef = this.modalService.open(OfferModalComponent, { size: 'lg' });
    modalRef.componentInstance.company = company;
    modalRef.result.then((result)=> {
      if(result) {
        console.log(result);
      }
    })
  }

}

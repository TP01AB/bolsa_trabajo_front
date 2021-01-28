import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyOfferService } from '../../services/company-offer.service';

@Component({
  selector: 'app-offer-delete',
  templateUrl: './offer-delete.component.html',
  styleUrls: ['./offer-delete.component.scss']
})
export class OfferDeleteComponent implements OnInit {

  @Input() public id;
  constructor(public activeModal: NgbActiveModal, private companyOfferService: CompanyOfferService) { }

  ngOnInit(): void {
  }

  confirmDelete(){
    this.companyOfferService.deleteOffer(this.id);
    this.activeModal.close();
  }

  close(){
    this.activeModal.close();
  }

}

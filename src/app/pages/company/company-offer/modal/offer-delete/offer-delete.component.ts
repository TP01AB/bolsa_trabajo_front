import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyOfferService } from '../../services/company-offer.service';

@Component({
    selector: 'app-offer-delete',
    templateUrl: './offer-delete.component.html',
    styleUrls: ['./offer-delete.component.scss']
})
export class OfferDeleteComponent implements OnInit {

    @Input() public id;
    @Output() deleteOk: EventEmitter<any> = new EventEmitter();

    constructor(public activeModal: NgbActiveModal, private companyOfferService: CompanyOfferService) { }

    ngOnInit(): void {
    }

    confirmDelete() {
        this.companyOfferService.deleteOffer(this.id).subscribe(
            (response: any) => {
                this.deleteOk.emit(true);
                this.activeModal.close();
            },
            (error) => {
                console.log(error);
                this.deleteOk.emit(false);
                this.activeModal.close();
            }
        );
        this.activeModal.close();
    }

    close() {
        this.activeModal.close();
    }

}

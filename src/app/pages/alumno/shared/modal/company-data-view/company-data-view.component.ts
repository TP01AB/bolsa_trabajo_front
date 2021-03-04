import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StudentOfferService } from '../../../student-offer/services/student-offer.service';

@Component({
  selector: 'app-company-data-view',
  templateUrl: './company-data-view.component.html',
  styleUrls: ['./company-data-view.component.scss']
})
export class CompanyDataViewComponent implements OnInit {

  @Input() public id;
  company;
  isLoaded=false;
  constructor(public activeModal: NgbActiveModal, private studentOfferService: StudentOfferService) { }

  ngOnInit(): void {
    this.getCompany();
  }

  getCompany() {
    this.studentOfferService.getCompany(this.id).subscribe(
      (response: any) => {
        console.log(response);
        this.company = response;
        this.isLoaded=true;
      },
      (error) => {
        this.activeModal.close();
      }
    )
  }

  close() {
    this.activeModal.close();
  }

}

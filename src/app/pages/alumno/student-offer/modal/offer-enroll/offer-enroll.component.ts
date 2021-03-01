import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StudentOfferService } from '../../services/student-offer.service';

@Component({
  selector: 'app-offer-enroll',
  templateUrl: './offer-enroll.component.html',
  styleUrls: ['./offer-enroll.component.scss']
})
export class OfferEnrollComponent implements OnInit {

  @Input() public id;
  @Output() enrollOk: EventEmitter<any> = new EventEmitter();

  constructor(public activeModal: NgbActiveModal, private studentOfferService: StudentOfferService) { }

  ngOnInit(): void {
  }

  confirmEnroll() {
      this.studentOfferService.enrollOffer(this.id).subscribe(
          (response: any) => {
              this.enrollOk.emit(true);
              this.activeModal.close();
          },
          (error) => {
              console.log(error);
              this.enrollOk.emit(false);
              this.activeModal.close();
          }
      );
      this.activeModal.close();
  }

  close() {
      this.activeModal.close();
  }

}

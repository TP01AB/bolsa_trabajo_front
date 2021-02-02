import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyOfferService } from '../../services/company-offer.service';

@Component({
  selector: 'app-offer-duplicate',
  templateUrl: './offer-duplicate.component.html',
  styleUrls: ['./offer-duplicate.component.scss']
})
export class OfferDuplicateComponent implements OnInit {

  @Input() public offer;
  @Output() duplicateOk: EventEmitter<any> = new EventEmitter();
  contactForm: FormGroup;
  value = null;
  offerU: any;

  constructor(public activeModal: NgbActiveModal, private router: Router, private fb: FormBuilder, private companyOfferService: CompanyOfferService) {     
    const navigation = this.router.getCurrentNavigation();
    this.value = navigation?.extras?.state; }

  ngOnInit(): void {
    this.initForm();
    this.offerU = {...this.offer};
  }

  onSubmit() {
    if (!this.contactForm.valid) {
      return;
    }
    this.companyOfferService.storeOffer(this.contactForm).subscribe(
      (response: any) => {
        this.duplicateOk.emit(true);
        this.activeModal.close();
      },
      (error) => {
        console.log(error);
        this.duplicateOk.emit(false);
        this.activeModal.close();
      }
    );    

  }

  private initForm(): void {
    this.contactForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required]],
      vacant: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      description: ['', [Validators.required]],
    })
  }


}

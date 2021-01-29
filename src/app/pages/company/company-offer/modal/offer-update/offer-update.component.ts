import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyOfferService } from '../../services/company-offer.service';

@Component({
  selector: 'app-offer-update',
  templateUrl: './offer-update.component.html',
  styleUrls: ['./offer-update.component.scss']
})
export class OfferUpdateComponent implements OnInit {

  @Input() public offer;
  contactForm: FormGroup;
  value = null;
  offerU: any;

  constructor(public activeModal: NgbActiveModal, private router: Router, private fb: FormBuilder, private companyOfferService: CompanyOfferService) { 
    const navigation = this.router.getCurrentNavigation();
    this.value = navigation?.extras?.state;
  }

  ngOnInit(): void {
    this.initForm();
    this.offerU = {...this.offer};
    console.log(this.offerU);
    console.log(this.offer);
    
    
  }

  onSubmit(){
    if (!this.contactForm.valid) {
      return;
    }
    this.companyOfferService.updateOffer(this.contactForm).subscribe(
      (response: any) => {
        this.offer.name = this.contactForm.value.name;
        this.offer.vacant = this.contactForm.value.vacant;
        this.offer.startDate = this.contactForm.value.startDate;
        this.offer.endDate = this.contactForm.value.endDate;
        this.offer.description = this.contactForm.value.description;
        this.activeModal.close();
      },
      (error) => {
        console.log(error);
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


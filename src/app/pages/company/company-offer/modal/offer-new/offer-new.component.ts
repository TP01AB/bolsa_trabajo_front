import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyOfferService } from '../../services/company-offer.service';

@Component({
  selector: 'app-offer-new',
  templateUrl: './offer-new.component.html',
  styleUrls: ['./offer-new.component.scss']
})
export class OfferNewComponent implements OnInit {

  contactForm: FormGroup;
  value = null;

  constructor(public activeModal: NgbActiveModal, private router: Router, private fb: FormBuilder, private companyOfferService: CompanyOfferService) {
    const navigation = this.router.getCurrentNavigation();
    this.value = navigation?.extras?.state;
  }

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.companyOfferService.storeOffer(this.contactForm);      
    } else {
      console.log('Not valid')
      Object.keys(this.contactForm.controls).forEach(field => {
        const control = this.contactForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }

    this.activeModal.close();
    this.router.navigate([`empresa/ofertas`]);
  }

  private initForm(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      vacant: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      description: ['', [Validators.required]],
    })
  }

}

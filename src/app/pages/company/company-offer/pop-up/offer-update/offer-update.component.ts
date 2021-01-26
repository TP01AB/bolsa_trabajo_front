import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-offer-update',
  templateUrl: './offer-update.component.html',
  styleUrls: ['./offer-update.component.scss']
})
export class OfferUpdateComponent implements OnInit {
  @Input() public offer;
  contactForm: FormGroup;
  value = null;

  constructor(public activeModal: NgbActiveModal, private router: Router, private fb: FormBuilder) { 
    const navigation = this.router.getCurrentNavigation();
    this.value = navigation?.extras?.state;
  }

  ngOnInit(): void {
    this.initForm();
    console.log('oferta en popup' + this.offer);
    
  }

  onSave(){
    console.log(this.contactForm.value);
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


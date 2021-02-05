import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/auth/services/login.service';
import { CompanyOfferService } from '../../services/company-offer.service';

@Component({
  selector: 'app-offer-update',
  templateUrl: './offer-update.component.html',
  styleUrls: ['./offer-update.component.scss']
})
export class OfferUpdateComponent implements OnInit {

  @Input() public offer;
  areas: any[];
  contactForm: FormGroup;
  submitted = false;
  value = null;
  offerU: any;

  constructor(public activeModal: NgbActiveModal, private router: Router, private fb: FormBuilder, private companyOfferService: CompanyOfferService, private loginService: LoginService) {
    const navigation = this.router.getCurrentNavigation();
    this.value = navigation?.extras?.state;
  }

  ngOnInit(): void {
    this.initForm();
    this.offerU = { ...this.offer };
    this.getAreas();
  }

  onSubmit() {
    this.submitted = true;
    if (this.contactForm.invalid) {
        return;
    }

    // Creo la oferta con los datos necesarios para ser guardados en la base de datos
    let offer = this.contactForm.value;
    offer.id = this.offer.id;


    this.companyOfferService.updateOffer(offer).subscribe(
      (response: any) => {
        this.offer.name = this.contactForm.value.name;
        this.offer.vacant = this.contactForm.value.vacant;
        this.offer.areaDescription = this.contactForm.value.areaDescription;
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

  // Inicia el formulario
  private initForm(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      areaDescription: ['', [Validators.required]],
      vacant: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      description: ['', [Validators.required]],
    })
  }

  // Método para saber si un campo es valido
  isValidField(field: string): string {
    const validatedField = this.contactForm.get(field);
    return (!validatedField.valid && validatedField.touched)
      ? 'is-invalid' : validatedField.touched ? 'is-valid' : '';
  }

  get form() { return this.contactForm.controls; }

 // Método para obtener las areas
  getAreas() {
    this.areas= [];
    this.companyOfferService.getAreas().subscribe(
        (response: any) => {
            const areas = response;           
            areas.forEach((element: { id: any; description: any }) => {
                let area = {
                    'id': element.id,
                    'description': element.description,
                };
                this.areas.push(area);
            });
        },
        (error) => {
            console.log(error);
        }
    );
  }


}


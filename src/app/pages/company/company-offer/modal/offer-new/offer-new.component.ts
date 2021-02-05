import { getLocaleEraNames } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/auth/services/login.service';
import { CompanyOfferService } from '../../services/company-offer.service';

@Component({
  selector: 'app-offer-new',
  templateUrl: './offer-new.component.html',
  styleUrls: ['./offer-new.component.scss']
})
export class OfferNewComponent implements OnInit {

  @Output() storeOk: EventEmitter<any> = new EventEmitter();

  areas: any[];
  contactForm: FormGroup;
  submitted = false;
  value = null;

  constructor(public activeModal: NgbActiveModal, private router: Router, private fb: FormBuilder, private companyOfferService: CompanyOfferService, private loginService: LoginService) {
    const navigation = this.router.getCurrentNavigation();
    this.value = navigation?.extras?.state;
  }

  ngOnInit(): void {
    this.initForm();
    this.getAreas();
  }

  get form() { return this.contactForm.controls; }

  // Crea una nueva oferta en el onSubmit
  onSubmit() {
    this.submitted = true;
    if (this.contactForm.invalid) {
        return;
    }
    // Creo la oferta con los datos necesarios para ser guardados en la base de datos
    let offer = this.contactForm.value;
    offer.company_id = parseInt(this.loginService.user.company_id);

    this.companyOfferService.storeOffer(offer).subscribe(
      (response: any) => {
        this.storeOk.emit(true);
        this.activeModal.close();
      },
      (error) => {
        console.log(error);
        this.storeOk.emit(false);
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

  // Método para comprobar si un campo es valido
  isValidField(field: string): string {
    const validatedField = this.contactForm.get(field);
    return (!validatedField.valid && validatedField.touched)
        ? 'is-invalid' : validatedField.touched ? 'is-valid' : '';
}

}

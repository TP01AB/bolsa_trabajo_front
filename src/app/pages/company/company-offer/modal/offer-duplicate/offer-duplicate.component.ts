import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/auth/services/login.service';
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
  submitted = false;
  value = null;
  offerU: any;
  areas: any[];

  constructor(public activeModal: NgbActiveModal, private router: Router, private fb: FormBuilder, private companyOfferService: CompanyOfferService, private loginService: LoginService) {     
    const navigation = this.router.getCurrentNavigation();
    this.value = navigation?.extras?.state; }

  ngOnInit(): void {
    this.initForm();
    this.offerU = {...this.offer};
    this.getAreas();
  }

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

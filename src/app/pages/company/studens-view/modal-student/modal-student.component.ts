import { StudentOfferService } from './../../../alumno/student-offer/services/student-offer.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/auth/services/login.service';
import { Router } from '@angular/router';
import { CompanyOfferService } from '../../company-offer/services/company-offer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-modal-student',
  templateUrl: './modal-student.component.html',
  styleUrls: ['./modal-student.component.scss']
})
export class ModalStudentComponent implements OnInit {
  @Input() public student;
  offers: any[];
  offersID: any[];
  solicitudForm: FormGroup;
  loaded = false;
  value = null;
  submitted = false;
  studentU: any;
  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private router: Router, private loginService: LoginService, private companyOfferService: CompanyOfferService,private StudentOfferService: StudentOfferService) {
    const navigation = this.router.getCurrentNavigation();
    this.value = navigation?.extras?.state;
   }

  ngOnInit(): void {
    this.initForm();
    this.studentU = { ...this.student };
    this.getInterviewsStudent(this.studentU.id);
    this.getOffersActive();
  }
  onSubmit() {
    this.submitted = true;
    let interview = this.solicitudForm.value;
    this.companyOfferService.enrollOffer(this.solicitudForm.value.offer, this.studentU.id).subscribe(
      (response: any) => {
        console.log("insertado correctamente");
        this.activeModal.close();
      },
      (error) => {
        console.log(error);

        this.activeModal.close();
      }
    );
    this.activeModal.close();
  }

  private initForm(): void {
    this.solicitudForm = this.fb.group({
      offer: ['', [Validators.required]],
    })
  }
  get form() { return this.solicitudForm.controls; }

  // Método para saber si un campo es valido
  isValidField(field: string): string {
    const validatedField = this.solicitudForm.get(field);
    return (!validatedField.valid && validatedField.touched)
      ? 'is-invalid' : validatedField.touched ? 'is-valid' : '';
  }

  getInterviewsStudent(student_id:number) {
    this.offersID = [];
    this.StudentOfferService.getOffersInterviewCompany(student_id).subscribe(
      (response: any) => {
        const offers = response;
        console.log(response);
        //Recupero las ofertas a las que está apuntado el alumno
        offers.forEach((element: {
          id: any;
        }) => {
            let offer = {
              'id': element.id,
            };
          this.offersID.push(offer);
        }
        )
        console.log(this.offersID);
      },
      (error) => {
        console.log(error);
      }
    )
  }
  getOffersActive() {
    this.offers = [];
    var existe: Boolean;
    this.companyOfferService.getCompanyOffersActive(this.loginService.user.company_id).subscribe(
      (response: any) => {
        const offers = response;

        offers.forEach((element: { id: any; name: any }) => {
          let offer = {
            'id': element.id,
            'name': element.name,
          };
          existe = false;
          this.offersID.forEach((offer: { id:any }) => {

            if (offer.id == element.id) { existe = true;}
          })
          if (!existe) { this.offers.push(offer) }
        });
        this.loaded = true;
        console.log(this.offers);
      },
      (error) => {
        console.log(error);
        this.activeModal.close();
      }
    );
}
  }


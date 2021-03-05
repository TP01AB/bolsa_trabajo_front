import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StudentProfileService } from '../services/student-profile.service';
import { LoginService } from 'src/app/auth/services/login.service';
import { Router } from '@angular/router';
import { FormsFunctionsService } from 'src/app/shared/services/forms-functions.service';
import { ModalSetAreasComponent } from './modal/modal-set-areas/modal-set-areas.component';


@Component({
  selector: 'perfil-al',
  templateUrl: './perfil-al.component.html',
  styleUrls: ['./perfil-al.component.scss']
})
export class PerfilAlComponent implements OnInit {  

  @Input() parent;
  @Input() parent2: any;
  data;
  model: NgbDateStruct;
  contactForm: FormGroup;
  areas = [];

  //Patrones de validación
  private isName = "^(?=.{3,15}$)[A-ZÁÉÍÓÚ][a-zñáéíóú]+(?: [A-ZÁÉÍÓÚ][a-zñáéíóú]+)?$"  
  private isDni = "^[0-9]{8,8}[A-Za-z]$"
  //private isPhone = "^(?:(?:\\+|00)?34)?[67]\\d{8}$$"
  private isPhone = "^[67]\\d{8}$$"

  constructor(private fb: FormBuilder, private ProfileService: StudentProfileService, private loginService: LoginService, 
    public router: Router, private gestorForm: FormsFunctionsService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.areas = [];
    if(this.router.url === '/alumno/perfil') {      
      //console.log(this.parent2);
      this.data = JSON.parse(this.parent2)
      console.log(this.data);
      //console.log(this.data.birthdate);
      this.initForm();      
      this.contactForm.patchValue({
        name: this.data.name,
        lastName: this.data.lastnames,                  
        dni: this.data.dni,
        phone: this.data.phone,   
        area: this.data.area,
        birthdate: this.data.birthdate,     
        aptitudes: this.data.aptitudes
      })      
    } else {
      this.initForm();      
    }
  }

  onSubmit() {
    if (this.contactForm.valid) {

      this.ProfileService.updateStudent(this.contactForm).subscribe(
        (response: any) => {
          console.log(response);  
          this.router.navigate(['/alumno/dashboard']);        
        },
        (error: any) => {
          console.log(error);
        }
      );            
    } else {
      console.log('Not valid')
      Object.keys(this.contactForm.controls).forEach(field => {
        const control = this.contactForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }

  validate(): any {
    return this.gestorForm.validate(this.contactForm);
  }

  toJason(): any {
    return this.gestorForm.toJason(this.contactForm);
  }

  //Validacion
  isValidField (field:string):string {
    const validatedField = this.contactForm.get(field);
    return ( !validatedField.valid && validatedField.touched)
    ? 'is-invalid' : validatedField.touched ? 'is-valid' : '';
  }

  notRequiredHasValue(field:string):string {
    return this.contactForm.get(field).value ? 'is-valid' : '';
  }

  private initForm():void {
    
    this.contactForm = this.fb.group({
      name: ['',[Validators.required, Validators.pattern(this.isName)]],
      lastName: ['',[Validators.required, Validators.pattern(this.isName)]],      
      birthdate: ['',Validators.required],      
      dni: ['',[Validators.required, Validators.minLength(9), Validators.maxLength(9),Validators.pattern(this.isDni)]],
      phone: ['',[Validators.required, Validators.pattern(this.isPhone)]],
      area:['',Validators.required],
      aptitudes: ['',[Validators.required, Validators.minLength(10), Validators.maxLength(500)]]
    })

  }

  selectAreas() {
    console.log(this.parent);
    const modalRef = this.modalService.open(ModalSetAreasComponent);
    modalRef.componentInstance.areasGet = this.parent;
    modalRef.componentInstance.areasSaved = this.areas;
    modalRef.result.then((result) => {
      if (result) {
        console.log(result);
      }
    });
    modalRef.componentInstance["valueChange"].subscribe(event => {
      this.areas = event;
      this.displayCounter("Soy registro: "+this.areas);
    });
  }

  displayCounter(count) {
    console.log(count);
  }

}

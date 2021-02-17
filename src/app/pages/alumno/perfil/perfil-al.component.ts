import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { StudentProfileService } from '../services/student-profile.service';
import { LoginService } from 'src/app/auth/services/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'perfil-al',
  templateUrl: './perfil-al.component.html',
  styleUrls: ['./perfil-al.component.scss']
})
export class PerfilAlComponent implements OnInit {  

  @Input() parent;
  model: NgbDateStruct;
  contactForm: FormGroup;

  //Patrones de validación
  private isName = "^(?=.{3,15}$)[A-ZÁÉÍÓÚ][a-zñáéíóú]+(?: [A-ZÁÉÍÓÚ][a-zñáéíóú]+)?$"  
  private isDni = "^[0-9]{8,8}[A-Za-z]$"
  //private isPhone = "^(?:(?:\\+|00)?34)?[67]\\d{8}$$"
  private isPhone = "^[67]\\d{8}$$"

  constructor(private fb: FormBuilder, private ProfileService: StudentProfileService, private loginService: LoginService, public router: Router) { }

  ngOnInit(): void {
    console.log(parent);
    this.initForm();
  }

  onSubmit() {
    if (this.contactForm.valid) {

      this.ProfileService.insertStudent(this.contactForm);            

    } else {
      console.log('Not valid')
      Object.keys(this.contactForm.controls).forEach(field => {
        const control = this.contactForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
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

}

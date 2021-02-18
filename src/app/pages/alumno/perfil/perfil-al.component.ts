import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InsertStudentService } from '../services/insert-student.service';
import { FormsFunctionsService } from 'src/app/shared/services/forms-functions.service';


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

  constructor(private fb: FormBuilder, private insertService: InsertStudentService, private gestorForm: FormsFunctionsService) { }

  ngOnInit(): void {
    this.initForm();    
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.insertService.insertStudent(this.contactForm);            
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

}

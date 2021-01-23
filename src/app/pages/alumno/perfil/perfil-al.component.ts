import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'perfil-al',
  templateUrl: './perfil-al.component.html',
  styleUrls: ['./perfil-al.component.scss']
})
export class PerfilAlComponent implements OnInit {

  private isEmail = /\S+@\S+\.\S+/;
  model: NgbDateStruct;
  contactForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this,this.initForm();
  }

  onSave():void {
    if (this.contactForm.valid) {
      console.log(this.contactForm.value)
    } else {
      console.log('Not valid')
    }
  }

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
      name: ['',[Validators.required]],
      lastName: ['',Validators.required], 
      birthdate: ['',Validators.required],
      studies: ['',Validators.required],
      dni: ['',[Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      message: ['',[Validators.required, Validators.minLength(10), Validators.maxLength(500)]]
    })
  }

}

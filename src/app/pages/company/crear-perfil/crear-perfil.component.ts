import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-crear-perfil',
  templateUrl: './crear-perfil.component.html',
  styleUrls: ['./crear-perfil.component.scss']
})
export class CrearPerfilComponent implements OnInit {
  model: NgbDateStruct;
  companyInfoForm: FormGroup;

  //Expresiones regulares para validación.
  isCif = '^[a-zA-Z]{1}\d{7}[a-zA-Z0-9]{1}$';

  constructor(private fb: FormBuilder) { }

  onSave(): void {
    if (this.companyInfoForm.valid) {
      console.log(this.companyInfoForm.value);
    } else {
      console.log('Not valid');
    }
  }
  ngOnInit(): void {
    this.initForm();
  }
  isValidField(field: string): string {
    const validatedField = this.companyInfoForm.get(field);
    return (!validatedField.valid && validatedField.touched)
      ? 'is-invalid' : validatedField.touched ? 'is-valid' : '';
  }
  private initForm(): void {
    this.companyInfoForm = this.fb.group({
      cif: ['', [Validators.required, Validators.pattern(this.isCif)]],
      name: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.min(30), Validators.max(500)]],
      sector: ['', [Validators.required, Validators.min(5)]],
      birthdate: ['', Validators.required]
    });
  }
}

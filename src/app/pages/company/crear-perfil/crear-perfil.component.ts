import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { FormsFunctionsService } from 'src/app/shared/services/forms-functions.service';
import { InsertCompanyService } from './services/insert-company.service';
@Component({
  selector: 'app-crear-perfil',
  templateUrl: './crear-perfil.component.html',
  styleUrls: ['./crear-perfil.component.scss'],
})
export class CrearPerfilComponent implements OnInit {
  model: NgbDateStruct;
  companyInfoForm: FormGroup;

  //Expresiones regulares para validación.
  isCif = /^([ABCDEFGHJKLMNPQRSUVW])(\d{7})([0-9A-J])$/;

  constructor(private fb: FormBuilder, private insertCompanyService: InsertCompanyService, private gestorForm: FormsFunctionsService) { }

  onSave(): void {
    if (this.companyInfoForm.valid) {
      this.insertCompanyService.InsertCompany(this.companyInfoForm);
    } else {
      console.log('Not valid');
    }
  }
  ngOnInit(): void {
    this.initForm();
  }

  validate(): any {
    return this.gestorForm.validate(this.companyInfoForm);
  }

  toJason(): any {
    return this.gestorForm.toJason(this.companyInfoForm);
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
      description: ['', [Validators.required, Validators.minLength(30), Validators.maxLength(500)]],
      sector: ['', [Validators.required, Validators.minLength(5)]],
      birthdate: ['', Validators.required]
    });
  }
}

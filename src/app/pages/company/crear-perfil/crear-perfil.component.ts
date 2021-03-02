import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { FormsFunctionsService } from 'src/app/shared/services/forms-functions.service';
import { ViewProfileComponent2 } from '../view-profile/view-profile.component';
import { CompanyProfileService } from './services/view-profile.service';
@Component({
  selector: 'app-crear-perfil',
  templateUrl: './crear-perfil.component.html',
  styleUrls: ['./crear-perfil.component.scss'],
})
export class CrearPerfilComponent implements OnInit {
  @Input() parent;
  data;
  model: NgbDateStruct;
  companyInfoForm: FormGroup;

  //Expresiones regulares para validación.
  isCif = /^([ABCDEFGHJKLMNPQRSUVW])(\d{7})([0-9A-J])$/;

  constructor(private fb: FormBuilder, private viewprofile: CompanyProfileService, private gestorForm: FormsFunctionsService, public router: Router) { }

  onSave(): void {
    if (this.companyInfoForm.valid) {

      this.viewprofile.updateCompany(this.companyInfoForm).subscribe(
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
      Object.keys(this.companyInfoForm.controls).forEach(field => {
        const control = this.companyInfoForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }
  ngOnInit(): void {
    if (this.router.url === '/empresa/perfil') {
      console.log(this.parent);
      this.data = JSON.parse(this.parent);
      console.log(this.data);
      console.log(this.data.birthdate);
      this.initForm();
      this.companyInfoForm.patchValue({
        name: this.data.name,
        cif: this.data.cif,
        sector: this.data.section,
        birthdate: this.data.foundation,
        description: this.data.description
      })
    } else {
      this.initForm();
    }
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

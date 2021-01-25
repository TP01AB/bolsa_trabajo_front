import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-perfil',
  templateUrl: './crear-perfil.component.html',
  styleUrls: ['./crear-perfil.component.scss']
})
export class CrearPerfilComponent implements OnInit {
companyInfoForm: FormGroup;

  //Expresiones regulares para validación.
  private isEmail = ' /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/';
  private isPassword = '^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$';


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
  private initForm(): void {
    this.companyInfoForm = this.fb.group({
      cif: ['', [Validators.required, Validators.pattern(this.isEmail)]],
      name: ['', [Validators.required]]

    });
  }
}

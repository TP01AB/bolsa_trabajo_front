import { RegisterService } from './services/register.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PerfilAlComponent } from '../alumno/perfil/perfil-al.component';
import { FormsFunctionsService } from 'src/app/shared/services/forms-functions.service';
import { CrearPerfilComponent } from '../company/crear-perfil/crear-perfil.component';
import { trigger, transition, style, animate } from '@angular/animations';
@Component({
  selector: 'app-register',
  animations: [
    trigger(
      'inOutAnimation', 
      [
        transition(
          ':enter', 
          [
            style({ height: 0, opacity: 0 }),
            animate('1.5s ease', 
                    style({ height: '*', opacity: 1 }))
          ]
        ),   ,
        transition(
          ':leave', 
          [
            style({ height: '*', opacity: 1 }),
            animate('1.5s ease', 
                    style({ height: 0, opacity: 0 }))
          ]
        )
      ]
    )
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;  

  @ViewChild(PerfilAlComponent) private perfilAl: PerfilAlComponent;
  @ViewChild(CrearPerfilComponent) private perfilEmp: CrearPerfilComponent;

  constructor(private fb: FormBuilder, private registerUser: RegisterService, private gestorForm: FormsFunctionsService) { }
  isEmail = /\S+@\S+\.\S+/;

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.isEmail)]],
      password: ['', [Validators.required, Validators.min(8)]],
      condicion: ['', Validators.required]
    });
  }

  isValidField(field: string): string {
    const validatedField = this.registerForm.get(field);
    return (!validatedField.valid && validatedField.touched)
      ? 'is-invalid' : validatedField.touched ? 'is-valid' : '';
  }

  onSave(): void {    
    var tipo = this.registerForm.get('condicion').value
    if(tipo == 'student') {        
      if (this.registerForm.valid && this.perfilAl.validate()==1) {
        this.registerUser.registerUser(this.gestorForm.toJason(this.registerForm), this.perfilAl.toJason(), tipo);
      } else {
        this.perfilAl.validate();                       
        this.gestorForm.validate(this.registerForm);
      }
    }
    if(tipo == 'company') {        
      if (this.registerForm.valid && this.perfilEmp.validate()==1) {
        this.registerUser.registerUser(this.gestorForm.toJason(this.registerForm), this.perfilEmp.toJason(), tipo);
      } else {
        this.perfilEmp.validate();                       
        this.gestorForm.validate(this.registerForm);
      }
    }
  }
}

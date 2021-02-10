import { RegisterService } from './services/register.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PerfilAlComponent } from '../alumno/perfil/perfil-al.component';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;  

  @ViewChild(PerfilAlComponent) private perfilAl: PerfilAlComponent;

  constructor(private fb: FormBuilder, private registerUser: RegisterService) { }
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
        this.registerUser.registerUser(this.registerForm, this.perfilAl.toJason(), tipo);
      } else {
        this.perfilAl.validate();             
        Object.keys(this.registerForm.controls).forEach(field => {
          const control = this.registerForm.get(field);
          control.markAsTouched({ onlySelf: true });
        });
      }
    }
  }
}

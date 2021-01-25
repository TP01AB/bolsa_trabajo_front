import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  //Expresiones regulares para validación.
  private isEmail = ' /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/';
  private isPassword = '^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$';


  constructor(private fb: FormBuilder) {

  }

  onSave(): void {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
    } else {
      console.log('Not valid');
    }
  }
  ngOnInit(): void {
    this.initForm();
  }
  private initForm(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.isEmail)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16), Validators.pattern(this.isPassword)]]
    });
  }
}

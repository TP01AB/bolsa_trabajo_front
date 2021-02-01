import { RegisterService } from './services/register.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private registerUser: RegisterService) { }
  isEmail = /\S+@\S+\.\S+/;

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.isEmail)]],
      password: ['', [Validators.required, Validators.min(8)]]
    });
  }

  isValidField(field: string): string {
    const validatedField = this.registerForm.get(field);
    return (!validatedField.valid && validatedField.touched)
      ? 'is-invalid' : validatedField.touched ? 'is-valid' : '';
  }

  onSave(): void {
    if (this.registerForm.valid) {
      this.registerUser.registerUser(this.registerForm);
    } else {
      Object.keys(this.registerForm.controls).forEach(field => {
        const control = this.registerForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }
}

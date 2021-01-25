import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }
  private initForm() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  onSave(): void {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
    } else {
      console.log('not valid');
    }
  }
}

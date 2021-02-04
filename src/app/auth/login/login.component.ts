import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

<<<<<<< HEAD
  newLogin: FormGroup;
  submitted = false;
  message: string;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router) {
    this.newLogin = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
    this.message = "";
  }

  ngOnInit(): void {
    //Si ya hemos hecho login vamos a /articles
    if (this.loginService.isUserSignedIn()) {
      this.router.navigate(['/empresa/ofertas']);
=======
    newLogin: FormGroup;
    submitted = false;
    message: string;
    isEmail = /\S+@\S+\.\S+/;

    constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router) {
        this.newLogin = this.formBuilder.group({
            email: ['', [Validators.required, Validators.pattern(this.isEmail)]],
            password: ['', [Validators.required, Validators.min(8)]]
        });
        this.message = "";
    }

    ngOnInit(): void {
        //Si ya hemos hecho login vamos a /articles
        if (this.loginService.isUserSignedIn()) {
            this.loginService.rolRedirect();
        }
>>>>>>> f534155... Recupero company_id y lo añado al session storage
    }

<<<<<<< HEAD
  get form() { return this.newLogin.controls; }
=======
    isValidField(field: string): string {
        const validatedField = this.newLogin.get(field);
        return (!validatedField.valid && validatedField.touched)
            ? 'is-invalid' : validatedField.touched ? 'is-valid' : '';
    }

    get form() { return this.newLogin.controls; }
>>>>>>> f534155... Recupero company_id y lo añado al session storage

    onSubmit() {
        this.submitted = true;
        if (this.newLogin.invalid) {
            return;
        }

        let userData = this.newLogin.value;
        const email = userData.email;
        const password = userData.password;

<<<<<<< HEAD
    this.onReset();
    //Nos subscribimos a la petición de login que se implementa en el servicio
    this.loginService.loginSuscription(email, password);
    this.message = this.loginService.message;
  }
=======
        this.onReset();
        //Nos subscribimos a la petición de login que se implementa en el servicio
        this.loginService.loginSuscription(email, password);
        this.message = this.loginService.message;
        console.log(this.message);
>>>>>>> f534155... Recupero company_id y lo añado al session storage

    }

<<<<<<< HEAD
  cancel() {
    this.onReset();
  }
=======
    onReset() {
        this.submitted = false;
        this.newLogin.reset();
    }

    cancel() {
        this.router.navigate(['']);
    }
>>>>>>> f534155... Recupero company_id y lo añado al session storage

}

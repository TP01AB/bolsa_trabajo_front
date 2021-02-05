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
    }

    isValidField(field: string): string {
        const validatedField = this.newLogin.get(field);
        return (!validatedField.valid && validatedField.touched)
            ? 'is-invalid' : validatedField.touched ? 'is-valid' : '';
    }

    get form() { return this.newLogin.controls; }

    onSubmit() {
        this.submitted = true;
        if (this.newLogin.invalid) {
            return;
        }

        let userData = this.newLogin.value;
        const email = userData.email;
        const password = userData.password;

        this.onReset();
        //Nos subscribimos a la petición de login que se implementa en el servicio
        this.loginService.loginSuscription(email, password);
        this.message = this.loginService.message;
        console.log(this.message);

    }

    onReset() {
        this.submitted = false;
        this.newLogin.reset();
    }

    cancel() {
        this.router.navigate(['']);
    }

}

import { animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from '../services/login.service';
import { ForgetPassModalComponent } from './forget-pass-modal/forget-pass-modal.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  newLogin: FormGroup;
  submitted = false;
  animate = false;
  message: any;
  isEmail = /\S+@\S+\.\S+/;
  user: any;
  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router, private modalService: NgbModal) {
    this.newLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(this.isEmail)]],
      password: ['', [Validators.required, Validators.min(8)]]
    });
    this.user = {
      access_token: "",
      user_id: "",
      rol_id: "",
      email: "",
      name: "",
      lastnames: "",
      company_id: "",
      student_id: "",
      avatar: "",
    }
    this.message = "";
    this.rolRedirect();
  }

  ngOnInit(): void {
    //Si ya hemos hecho login vamos a /dashboard
    if (this.loginService.isUserSignedIn()) {
      this.rolRedirect();
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


    this.animate = true;
    this.loginService.login(email, password).subscribe(
      (response: any) => {

        this.message = "Login correcto";
        this.user.access_token = response.message.access_token;
        this.user.email = response.message.user.email;
        this.user.user_id = response.message.user.id;
        this.user.rol_id = response.message.rol;
        this.user.name = response.message.name;
               
        if (this.user.rol_id === 3) {
          this.user.student_id = response.message.student_id;
          this.user.lastnames = response.message.lastnames;
        }
        if (this.user.rol_id === 4) {
          this.user.company_id = response.message.company_id;
        }
        sessionStorage.setItem(LoginService.SESSION_STORAGE_KEY, JSON.stringify(this.user));
        console.log(this.user);
        this.rolRedirect();
      },
      (error) => {
        console.log(error);
        this.message = error.error.message;
        console.log("fallo en login: " + this.message);
        this.animate = false;
      }
    );
    

  }

  onReset() {
    this.submitted = false;
    this.newLogin.reset();
  }

  cancel() {
    this.router.navigate(['']);
  }

  rolRedirect() {
    if (this.loginService.isUserSignedIn())
      switch (this.user.rol_id) {
        case 1:
          this.router.navigate(['/admin/dashboard']);
          break;
        case 2:
          this.router.navigate(['/admin/dashboard']);
          break;
        case 3:
          this.router.navigate(['/alumno/dashboard']);
          break;
        case 4:
          this.router.navigate(['/empresa/dashboard']);
          break;
        default:
          break;
      }
  }

  
    

  forgetPass(e) {
    e.preventDefault();
    const modalRef = this.modalService.open(ForgetPassModalComponent);    
    modalRef.result.then((result) => {
      if (result) {
        console.log(result);
      }
    });    
  }
}

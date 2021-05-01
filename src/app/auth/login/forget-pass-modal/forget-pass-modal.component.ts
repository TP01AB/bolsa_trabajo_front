import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-forget-pass-modal',
  templateUrl: './forget-pass-modal.component.html',
  styleUrls: ['./forget-pass-modal.component.scss']
})
export class ForgetPassModalComponent implements OnInit {
  
  forgetPass: FormGroup;
  isEmail = /\S+@\S+\.\S+/;
  message: any;

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private loginService: LoginService) { 
    this.forgetPass = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(this.isEmail)]],      
    });
    this.message = "";
  }


  submitted = false;

  ngOnInit(): void {
    
  }

  isValidField(field: string): string {
    const validatedField = this.forgetPass.get(field);
    return (!validatedField.valid && validatedField.touched)
      ? 'is-invalid' : validatedField.touched ? 'is-valid' : '';
  }

  onSubmit() {    
    this.message = "Espere un momento";
    if (this.forgetPass.valid) {
      const email = this.forgetPass.get('email').value;
      this.loginService.forgetPass(email).subscribe(
        (response: any) => {
          this.message = "Recibira un correo en breve con su nueva contraseña";
          console.log(response);
        },
        (error) => {
          console.log(error);
          this.message = error.error.message;
          console.log("error: " + this.message);        
        }
      )
    } else {
      console.log('Not valid')
      Object.keys(this.forgetPass.controls).forEach(field => {
        const control = this.forgetPass.get(field);
        control.markAsTouched({ onlySelf: true });
      });          
    }
  }

  close() {
    this.activeModal.close();
  }

}

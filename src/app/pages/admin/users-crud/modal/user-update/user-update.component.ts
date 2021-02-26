import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/auth/services/login.service';
import { UsersAdminService } from '../../../services/users-admin.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal, private router: Router, private fb: FormBuilder, private userService: UsersAdminService, private loginService: LoginService) { }

  @Input() public user;
  registerForm: FormGroup;
  submitted = false;
  isEmail = /\S+@\S+\.\S+/;

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
        return;
    } else {      
      let user = this.registerForm.value;
      user.id = this.user.id;
  
  
      this.userService.updateUser(user).subscribe(
        (response: any) => {
          if(this.loginService.user.user_id == this.user.id) {
            sessionStorage.removeItem("apiPassport");
            this.router.navigate([''])
          }        
          this.activeModal.close();
        },
        (error) => {
          console.log(error);
          this.activeModal.close();
        }
      );
    }

    
  }

  initForm() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.isEmail)]],
      password: ['', [Validators.required, Validators.min(8)]],      
    });
    this.registerForm.patchValue({
      email: this.user.email      
    });
  }

  isValidField(field: string): string {
    const validatedField = this.registerForm.get(field);
    return (!validatedField.valid && validatedField.touched)
      ? 'is-invalid' : validatedField.touched ? 'is-valid' : '';
  }

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/auth/services/login.service';
import { StudentOfferService } from '../../../student-offer/services/student-offer.service';

@Component({
  selector: 'app-unsub-inter-modal',
  templateUrl: './unsub-inter-modal.component.html',
  styleUrls: ['./unsub-inter-modal.component.scss']
})
export class UnsubInterModalComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal, private router: Router, private fb: FormBuilder, private studentService: StudentOfferService, private loginService: LoginService) { }

  @Input() public user;
  @Output() unsubOk: EventEmitter<any> = new EventEmitter();
  ngOnInit(): void {
  }

  unSub() {                 
    /*this.userService.updateUser(user).subscribe(
      (response: any) => {
        if(this.loginService.user.user_id == this.user.id) {
          sessionStorage.removeItem("apiPassport");
          this.router.navigate([''])
        }        
        this.unsubOk.emit(true);   
        this.activeModal.close();
      },
      (error) => {
        this.unsubOk.emit(false);   
        console.log(error);
        this.activeModal.close();
      }
    );*/
  }
}

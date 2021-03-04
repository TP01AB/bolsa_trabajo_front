import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/auth/services/login.service';
import { StudentOfferService } from '../../../student-offer/services/student-offer.service';

@Component({
  selector: 'app-acept-offer-modal',
  templateUrl: './acept-offer-modal.component.html',
  styleUrls: ['./acept-offer-modal.component.scss']
})
export class AceptOfferModalComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal, private router: Router, private studentService: StudentOfferService, private loginService: LoginService) { }

  @Input() public id;
  @Output() aceptOk: EventEmitter<any> = new EventEmitter();
  ngOnInit(): void {
    console.log(this.id);
  }

  acept() {                 
    this.studentService.unsub(this.id).subscribe(
      (response: any) => {           
        this.aceptOk.emit(true);   
        this.activeModal.close();
      },
      (error) => {
        this.aceptOk.emit(false);   
        console.log(error);
        this.activeModal.close();
      }
    );
  }

}

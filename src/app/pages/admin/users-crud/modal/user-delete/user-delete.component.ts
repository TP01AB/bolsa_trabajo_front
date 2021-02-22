import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.scss']
})
export class UserDeleteComponent implements OnInit {

  @Input() public id;
  @Output() deleteOk: EventEmitter<any> = new EventEmitter();
  constructor(public activeModal: NgbActiveModal, private userService: UsersService) { }

  ngOnInit(): void {
  }

  confirmDelete() {
    console.log(this.id);
    this.userService.deleteUser(this.id).subscribe(
        (response: any) => {
            this.deleteOk.emit(true);
            this.activeModal.close();
        },
        (error) => {
            console.log(error);
            this.deleteOk.emit(false);
            this.activeModal.close();
        }
    );
    this.activeModal.close();
}

close() {
    this.activeModal.close();
}

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AreasAdminService } from '../../../services/areas-admin.service';

@Component({
  selector: 'app-area-delete',
  templateUrl: './area-delete.component.html',
  styleUrls: ['./area-delete.component.scss']
})
export class AreaDeleteComponent implements OnInit {
  @Input() public id;
  @Output() deleteOk: EventEmitter<any> = new EventEmitter();
  constructor(public activeModal: NgbActiveModal, private areasService: AreasAdminService) { }


  ngOnInit(): void {
  }
  confirmDelete() {
    console.log(this.id);
    this.areasService.deleteArea(this.id).subscribe(
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

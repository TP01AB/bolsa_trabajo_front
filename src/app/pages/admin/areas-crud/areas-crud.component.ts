import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AreasAdminService } from '../services/areas-admin.service';
import { AreaDeleteComponent } from './modal/area-delete/area-delete.component';
import { AreaNewComponent } from './modal/area-new/area-new.component';

@Component({
  selector: 'app-areas-crud',
  templateUrl: './areas-crud.component.html',
  styleUrls: ['./areas-crud.component.scss']
})
export class AreasCrudComponent implements OnInit {

  constructor(private areasService: AreasAdminService, private modalService: NgbModal) { }

  public areas = [];

  ngOnInit(): void {    
    this.areas=[];
    this.getAreas();
  }

  getAreas() {
    this.areasService.getAreas().subscribe(
      (response: any) => {
        this.areas = response;
        console.log(this.areas);        
      },
      error => console.log(error)
    )
  }

  areaDelete(id: number) {
    const modalRef = this.modalService.open(AreaDeleteComponent);
    modalRef.componentInstance.id = id;
    modalRef.result.then((result) => {
      if (result) {
        console.log(result);
      }
    });
    modalRef.componentInstance["deleteOk"].subscribe(event => {
      this.getAreas();
    });
  }

  newArea() {
    const modalRef = this.modalService.open(AreaNewComponent);    
    modalRef.result.then((result) => {
      if (result) {
        console.log(result);
      }
    });
    modalRef.componentInstance["insertOk"].subscribe(event => {
      this.getAreas();
    });
  }

}

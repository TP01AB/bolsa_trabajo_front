import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/auth/services/login.service';
import { AreasAdminService } from '../services/areas-admin.service';
import { AreaDeleteComponent } from './modal/area-delete/area-delete.component';
import { AreaNewComponent } from './modal/area-new/area-new.component';
import { AreaUpdateComponent } from './modal/area-update/area-update.component';

@Component({
  selector: 'app-areas-crud',
  templateUrl: './areas-crud.component.html',
  styleUrls: ['./areas-crud.component.scss']
})
export class AreasCrudComponent implements OnInit {

  constructor(private areasService: AreasAdminService,public loginService: LoginService, private modalService: NgbModal, private router: Router) {
    if (!loginService.isUserSignedIn())
      this.router.navigate(['/login']);    
   }

  public areas = [];
  public loaded = false;

  ngOnInit(): void {    
    this.areas=[];
    this.getAreas();
  }

  getAreas() {
    this.areasService.getAreas().subscribe(
      (response: any) => {
        this.areas = response;
        //console.log(this.areas);     
        this.loaded = true;   
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

  areaUpdate(area: any) {
    const modalRef = this.modalService.open(AreaUpdateComponent, { size: 'lg' });
    modalRef.componentInstance.area = area;
    modalRef.result.then((result) => {
      if (result) {
        console.log(result);
      }
    });
    modalRef.componentInstance["updateOk"].subscribe(event => {
      this.getAreas();
    });
  }

}

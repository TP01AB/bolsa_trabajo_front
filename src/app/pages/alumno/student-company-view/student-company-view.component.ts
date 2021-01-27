import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CompanyDataMComponent } from './modal/company-data-m/company-data-m.component';

@Component({
  selector: 'app-student-company-view',
  templateUrl: './student-company-view.component.html',
  styleUrls: ['./student-company-view.component.scss'],
})
export class StudentCompanyViewComponent implements OnInit {
  
  constructor(private modalService: NgbModal) {}
  ngOnInit(): void {
        
  }

  open(company) {
    const modalRef = this.modalService.open(CompanyDataMComponent, { size: 'lg' });
    modalRef.componentInstance.company = company;
    modalRef.result.then((result)=> {
      if(result) {
        console.log(result);
      }
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap'; // Import necesarios para los

@Component({
  selector: 'app-company-offer',
  templateUrl: './company-offer.component.html',
  styleUrls: ['./company-offer.component.scss']
})
export class CompanyOfferComponent implements OnInit {

  closeResult: String;
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  // Abre el modal para crear una nueva oferta
  offerNew(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  // Abre el modal para modificar los datos de la oferta, hay que pasarme la oferta para que la pinte en el formulario
  offerUpdate(targetModal) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static'
   });
    //document.getElementById('fname').setAttribute('value', friend.firstname);
 }

  // Abre el modal para duplicar los datos de la oferta, hay que pasarme la oferta para que la pinte en el formulario
  offerDuplicate(targetModal) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static'
   });
    //document.getElementById('fname').setAttribute('value', friend.firstname);
 }

  // Abre el modal para borrar los datos de la oferta, hay que pasarme la oferta para que la pinte en el formulario
  offerDelete(targetModal) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static'
   });
    //document.getElementById('fname').setAttribute('value', friend.firstname);
 }


  // Cierra los modales
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}

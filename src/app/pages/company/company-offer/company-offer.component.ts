import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; // Import necesarios para los
import { Columns, PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import { LoginService } from 'src/app/auth/services/login.service';
import { OfferDeleteComponent } from './modal/offer-delete/offer-delete.component';
import { OfferDuplicateComponent } from './modal/offer-duplicate/offer-duplicate.component';
import { OfferNewComponent } from './modal/offer-new/offer-new.component';
import { OfferUpdateComponent } from './modal/offer-update/offer-update.component';
import { CompanyOfferService } from './services/company-offer.service';

@Component({
  selector: 'app-company-offer',
  templateUrl: './company-offer.component.html',
  styleUrls: ['./company-offer.component.scss']
})
export class CompanyOfferComponent implements OnInit {

  searchText;

  offers: any[];
  actOffers: any[];
  desOffers: any[];
  company: any;
  user: any;
  active: any;
  page = 1;
  pageSize = 6;
  closeResult: String;
  constructor(private modalService: NgbModal, private companyOfferService: CompanyOfferService, private loginService: LoginService, private router: Router) {
    if (!loginService.isUserSignedIn())
      this.router.navigate(['/login']);
    this.offers = [];
  }

  ngOnInit(): void {
    this.getOffers(); // Obtengo las ofertas
    this.active = true;
  }

  // Obtiene toas las ofertas y su ciclo
  getOffers() {
    this.offers = [];
    this.actOffers = [];
    this.desOffers = [];
    this.companyOfferService.getCompanyOffers(this.loginService.user.company_id).subscribe(
      (response: any) => {
        const offers = response;
        console.log(offers);
        offers.forEach((element: {
          id: any; name: any; vacant: any; startDate: any; endDate: any;
          description: any; area_id: any, isActive: any; area_description: any,
          students: any
        }) => {
          let offer = {
            'id': element.id,
            'name': element.name,
            'vacant': element.vacant,
            'startDate': element.startDate,
            'endDate': element.endDate,
            'description': element.description,
            'areaId': element.area_id,
            'isActive': element.isActive,
            'areaDescription': element.area_description,
            'students': element.students
          };
          this.offers.push(offer);

          // Guardo las ofertas dependiendo si estan activas o no
          if (offer.isActive == 0) {
            this.desOffers.push(offer);
          } else {
            this.actOffers.push(offer);
          }
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Abre el modal para crear una nueva oferta
  offerNew() {
    const modalRef = this.modalService.open(OfferNewComponent);
    modalRef.componentInstance["storeOk"].subscribe(event => {
      this.getOffers();
    });
  }

  // Abre un modal para modificar una oferta
  offerUpdate(offer: any) {
    const modalRef = this.modalService.open(OfferUpdateComponent);
    modalRef.componentInstance.offer = offer;
    modalRef.result.then((result) => {
      if (result) {
        console.log(result);
      }
    });
  }

  // Abre el modal para duplicar una oferta
  offerDuplicate(offer: any) {
    const modalRef = this.modalService.open(OfferDuplicateComponent);
    modalRef.componentInstance.offer = offer;
    modalRef.componentInstance["duplicateOk"].subscribe(event => {
      this.getOffers();
    });
  }

  // Abre el modal para borrar una oferta
  offerDelete(id: number) {
    const modalRef = this.modalService.open(OfferDeleteComponent);
    modalRef.componentInstance.id = id;
    modalRef.result.then((result) => {
      if (result) {
        console.log(result);
      }
    });
    modalRef.componentInstance["deleteOk"].subscribe(event => {
      this.getOffers();
    });
  }

  // Solicita al servicio el id de la compañia
  /* getCompanyId() {
     this.companyOfferService.getCompanyId().subscribe(
       (response: any) => {
         // Recupero el id de la compañia
         this.company = response;
         this.company_id = JSON.parse(this.company[0]).id;

         // Recupero el usuario, añado company id y lo guado en la sessionStorage
         this.user = this.loginService.user;
         this.user.company_id = this.company_id;
         sessionStorage.setItem(LoginService.SESSION_STORAGE_KEY, JSON.stringify(this.user));

       },
       (error) => {
         console.log(error);
       }
     );
   }*/

  // Funcion para cambiar entre ofertas activas o desactivadas.
  activeOffer() {
    let checkbox: any = document.getElementById('activeOffer');
    let label = document.getElementById('labelActiveOffer');
    if (checkbox.checked) {
      label.innerHTML = ('Activas');
      this.active = true;
    } else {
      label.innerHTML = ('Desactivadas');
      this.active = false;
    }
  }

  // Función para activar una oferta
  offerActive(id: number) {
    this.companyOfferService.aciveOffer(id).subscribe(
      (response: any) => {
        console.log(response);
        this.getOffers();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Funcion para desactivar una oferta
  offerDesactive(id: number) {
    this.companyOfferService.desactiveOffer(id).subscribe(
      (response: any) => {
        console.log(response);
        this.getOffers();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //Genera el listado de alumnos de una oferta
  studentsList(offer_id,offerName) {
    console.log(offerName);
    this.companyOfferService.getStudentsFromInterview(offer_id).subscribe(
      (response: any) => {
        var students = response.data;
        console.log(students);

        const pdf = new PdfMakeWrapper();

        pdf.pageOrientation('landscape');

        //Nombre oferta
        pdf.add(
          new Txt('Listado de alumnos de la oferta ').fontSize(15).decoration('underline').bold().end
        );

        pdf.add(
          new Txt(' ').fontSize(10).bold().end
        );

        pdf.add(
          new Txt(offerName).fontSize(15).bold().end
        );

        pdf.add(
          new Txt(' ').bold().italics().fontSize(15).end,      
        );
        
        //Listado
        pdf.add(
          new Columns(
            [ 'Nombre','Dni','Telefono','Email'],            
          ).fontSize(10).bold().end
        )

        pdf.add(
          new Txt(' ').fontSize(10).bold().end
        );
        

        for(var i=0; i<students.length;i++) {
          pdf.add(
            new Columns(
              [ students[i].name + ' ' + students[i].lastnames, students[i].dni,students[i].phone,students[i].email],              
            ).fontSize(10).end
          )
          pdf.add(
            new Txt(' ').fontSize(10).bold().end
          );
        }

        pdf.create().open();

      },
      (error) => {
        alert('No hay alumnos apuntados a la oferta '+ offerName);
        console.log(error);
      }
    )
  }
  
}

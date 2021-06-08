import { CompanyViewStudentsService } from './services/company-view-students.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; // Import necesarios para los
import { LoginService } from 'src/app/auth/services/login.service';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {  ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ModalStudentComponent } from './modal-student/modal-student.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-studens-view',
  templateUrl: './studens-view.component.html',
  styleUrls: ['./studens-view.component.scss']
})
export class StudensViewComponent implements OnInit {
  searchText;

  http: any;
  students: any[];
  page = 1;
  pageSize = 6;
  closeResult: String;
  constructor(private modalService: NgbModal, private StudentList: CompanyViewStudentsService, private loginService: LoginService, private router: Router,private sanitizer:DomSanitizer) {
    if (!loginService.isUserSignedIn())
      this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.getStudentSubscribe();
    console.log(this.students);
  }

  open(student:any) {
    const modalRef = this.modalService.open(ModalStudentComponent, { size: 'lg' });
    modalRef.componentInstance.student = student;
    modalRef.result.then((result) => {
      if (result) {
        console.log(result);
      }
    })
  }

  public getStudentSubscribe() {
    this.students = [];
    this.StudentList.getStudents().subscribe(
      (response: any) => {
        var students = JSON.parse(response);
        console.log(students);
        var idAnterior;
        students.forEach((element: {
          id: any;
          name: any;
          lastnames: any;
          dni: any;
          birthdate: any;
          phone: any;
          aptitudes: any;
          status: any;
          areas: any[];
          description: any;
        }) => {
          if (idAnterior != element.id) {
            var avatar;
            var studentAnterior; //CREACION ESTUDIANTE SI ES LA PRIMERA VEZ
            //Cargo foto de perfil
            this.loginService.getImage(element.id).subscribe(
              (response: any) => {
                //console.log(response);
                avatar = URL.createObjectURL(response);
                avatar = this.sanitizer.bypassSecurityTrustUrl(avatar);
                //console.log(this.imageToShow);
                idAnterior = element.id;
                let student = {
                  'id': element.id,
                  'name': element.name,
                  'lastnames': element.lastnames,
                  'dni': element.dni,
                  'birthdate': element.birthdate,
                  'phone': element.phone,
                  'aptitudes': element.aptitudes,
                  'status': element.status,
                  'areas': [],
                  'avatar': avatar
                };
            student.areas.push(element.description);
            this.students.push(student);
              },
              (error: any) => {                
                avatar = "http://www.hablamosdeeuropa.es/PublishingImages/No%20me%20paro/Formaci%C3%B3n/estudiante.png";
                idAnterior = element.id;
                let student = {
                  'id': element.id,
                  'name': element.name,
                  'lastnames': element.lastnames,
                  'dni': element.dni,
                  'birthdate': element.birthdate,
                  'phone': element.phone,
                  'aptitudes': element.aptitudes,
                  'status': element.status,
                  'areas': [],
                  'avatar': avatar
                };
                student.areas.push(element.description);
                this.students.push(student);
              }
            );
          } else { //AÑADIR AREA SI YA EXISTE ESTUDIANTE
            studentAnterior = this.students[idAnterior - 2];
            console.log(studentAnterior);
            studentAnterior.areas.push(element.description);
            this.students[idAnterior - 2] = studentAnterior;
          }
        }
        );
        console.log(this.students);
      },
      (error) => {
        console.log(error);
      }
    );

  }
}

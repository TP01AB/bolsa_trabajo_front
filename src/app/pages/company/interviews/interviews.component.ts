import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/auth/services/login.service';
import { CompanyViewStudentsService } from '../studens-view/services/company-view-students.service';

@Component({
  selector: 'app-interviews',
  templateUrl: './interviews.component.html',
  styleUrls: ['./interviews.component.scss']
})
export class InterviewsComponent implements OnInit {
  http: any;
  students: any[];
  page = 1;
  pageSize = 6;
  closeResult: String;
  constructor(private modalService: NgbModal, private StudentList: CompanyViewStudentsService, private loginService: LoginService, private router: Router) {
    if (!loginService.isUserSignedIn())
      this.router.navigate(['/login']);
  }
  ngOnInit(): void {
    this.getStudentSubscribe();

    console.log(this.students);
  }

  public getStudentSubscribe() {
    this.students = [];
    this.StudentList.getStudentsPendientes().subscribe(
      (response: any) => {
        var students = JSON.parse(response);
        console.log(students)
        var idAnterior;
        students.forEach((element: {
          id: any;
          user_id: any;
          email: any;
          name: any;
          lastnames: any;
          phone: any;
          aptitudes: any;
          status: any;
          offer_name: any;
          areas: any[];
          description: any;
        }) => {
          if (idAnterior != element.id) { //CREACION ESTUDIANTE SI ES LA PRIMERA VEZ
            idAnterior = element.id;
            let student = {
              'id': element.id,
              'user_id': element.user_id,
              'email': element.email,
              'name': element.name,
              'lastnames': element.lastnames,
              'phone': element.phone,
              'aptitudes': element.aptitudes,
              'status': element.status,
              'offer_name':element.offer_name,
              'areas': []
            };
            student.areas.push(element.description);
            this.students.push(student);
          } else { //AÑADIR AREA SI YA EXISTE ESTUDIANTE
            let studentAnterior = this.students[idAnterior - 2];
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

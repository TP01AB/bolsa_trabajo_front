import { CompanyViewStudentsService } from './services/company-view-students.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; // Import necesarios para los
import { LoginService } from 'src/app/auth/services/login.service';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-studens-view',
  templateUrl: './studens-view.component.html',
  styleUrls: ['./studens-view.component.scss']
})
export class StudensViewComponent implements OnInit {
  http: any;
  students: any[];

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
        }) => {
          if (idAnterior != element.id) {
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
              'areas': element.areas
            };
          }
          this.students.push(student);
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

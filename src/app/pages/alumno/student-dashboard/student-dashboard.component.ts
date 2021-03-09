import { StudentDashboardService } from './services/student-dashboard.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss']
})
export class StudentDashboardComponent implements OnInit {

  constructor(Router: Router, StudentDash: StudentDashboardService) { }

  ngOnInit(): void {
  }

}

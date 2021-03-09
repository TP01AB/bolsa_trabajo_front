import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CompanyDashboardService } from './services/company-dashboard.service';


@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.scss']
})
export class CompanyDashboardComponent implements OnInit {

  constructor(Router:Router,companyDash:CompanyDashboardService) { }

  ngOnInit(): void {
  }

}

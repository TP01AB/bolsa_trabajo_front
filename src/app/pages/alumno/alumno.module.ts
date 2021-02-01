import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumnoRoutingModule } from './alumno-routing.module';
import { AlumnoComponent } from './alumno.component';
import { PerfilAlModule } from './perfil/perfil-al.module';
import { StudentCompanyViewComponent } from './student-company-view/student-company-view.component';
import { CompanyDataMComponent } from './student-company-view/modal/company-data-m/company-data-m.component';


@NgModule({
  declarations: [AlumnoComponent, StudentCompanyViewComponent, CompanyDataMComponent],
  imports: [
    CommonModule,
    AlumnoRoutingModule,  
    PerfilAlModule
  ],
  exports: [
    AlumnoComponent
  ]
})
export class AlumnoModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumnoRoutingModule } from './alumno-routing.module';
import { AlumnoComponent } from './alumno.component';
import { PerfilAlModule } from './perfil/perfil-al.module';


@NgModule({
  declarations: [AlumnoComponent],
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

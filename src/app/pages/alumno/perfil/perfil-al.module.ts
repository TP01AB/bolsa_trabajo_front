import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilAlRoutingModule } from './perfil-al-routing.module';
import { PerfilAlComponent } from './perfil-al.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [PerfilAlComponent],
  imports: [
    CommonModule,
    PerfilAlRoutingModule,
    ReactiveFormsModule,
    FormsModule, 
    NgbModule
  ],
  exports: [
    PerfilAlComponent
  ]
})
export class PerfilAlModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilAlComponent } from './perfil-al.component';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalSetAreasComponent } from './modal/modal-set-areas/modal-set-areas.component';


@NgModule({
  declarations: [PerfilAlComponent, ModalSetAreasComponent],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    PerfilAlComponent
  ]
})
export class PerfilAlModule { }

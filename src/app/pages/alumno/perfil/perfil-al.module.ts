import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilAlComponent } from './perfil-al.component';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [PerfilAlComponent],
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

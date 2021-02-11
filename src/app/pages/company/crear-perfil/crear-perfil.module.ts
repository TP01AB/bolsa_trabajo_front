import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrearPerfilRoutingModule } from './crear-perfil-routing.module';
import { CrearPerfilComponent } from './crear-perfil.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [CrearPerfilComponent],
  imports: [
    CommonModule,    
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  exports: [CrearPerfilComponent]
})
export class CrearPerfilModule { }

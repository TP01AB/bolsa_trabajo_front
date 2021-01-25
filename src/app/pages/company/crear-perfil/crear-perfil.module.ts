import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrearPerfilRoutingModule } from './crear-perfil-routing.module';
import { CrearPerfilComponent } from './crear-perfil.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [CrearPerfilComponent],
  imports: [
    CommonModule,
    CrearPerfilRoutingModule,
    ReactiveFormsModule
  ],
  exports: [CrearPerfilComponent]
})
export class CrearPerfilModule { }

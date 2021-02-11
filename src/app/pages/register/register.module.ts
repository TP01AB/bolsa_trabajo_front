import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfilAlModule } from '../alumno/perfil/perfil-al.module';
import { CrearPerfilModule } from '../company/crear-perfil/crear-perfil.module';


@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PerfilAlModule,
    CrearPerfilModule
  ],
  exports:[RegisterComponent]
})
export class RegisterModule { }

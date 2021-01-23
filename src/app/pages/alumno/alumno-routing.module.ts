import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlumnoComponent } from './alumno.component';

const routes: Routes = [{ path: '', component: AlumnoComponent }, { path: 'perfilAl', loadChildren: () => import('./perfil/perfil-al.module').then(m => m.PerfilAlModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlumnoRoutingModule { }

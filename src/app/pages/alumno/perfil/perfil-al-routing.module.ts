import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilAlComponent } from './perfil-al.component';

const routes: Routes = [{ path: '', component: PerfilAlComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilAlRoutingModule { }

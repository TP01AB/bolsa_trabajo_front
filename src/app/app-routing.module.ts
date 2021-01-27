import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { AlumnoComponent } from './pages/alumno/alumno.component';
import { HomeComponent } from './pages/home/home.component';

//const routes: Routes = [{ path: 'alumno', loadChildren: () => import('./pages/alumno/alumno.module').then(m => m.AlumnoModule) }];
const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'inicio', component: HomeComponent},

  // Rutas admin
  {path: 'admin/dashboard', component: AdminDashboardComponent},

  //Rutas alumno
  {path: 'alumno/perfil', component: AlumnoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

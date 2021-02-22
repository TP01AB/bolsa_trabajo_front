import { StudensViewComponent } from './pages/company/studens-view/studens-view.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { StudentOfferViewComponent } from './pages/alumno/student-offer-view/student-offer-view.component';
import { StudentCompanyViewComponent } from './pages/alumno/student-company-view/student-company-view.component';
import { PerfilAlComponent } from './pages/alumno/perfil/perfil-al.component';
import { HomeComponent } from './pages/home/home.component';
import { CrearPerfilComponent } from './pages/company/crear-perfil/crear-perfil.component';
import { CompanyDashboardComponent } from './pages/company/company-dashboard/company-dashboard.component';
import { CompanyOfferComponent } from './pages/company/company-offer/company-offer.component';
import { LoginComponent } from './auth/login/login.component';
import { StudentDashboardComponent } from './pages/alumno/student-dashboard/student-dashboard.component';
import { ViewProfileComponent } from './pages/alumno/view-profile/view-profile.component';
import { ViewProfileComponent2 } from './pages/company/view-profile/view-profile.component';
import { StudentOfferComponent } from './pages/alumno/student-offer/student-offer.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'inicio', component: HomeComponent },

  // Auth
  { path: 'login', component: LoginComponent },

  // Rutas admin
  { path: 'admin/dashboard', component: AdminDashboardComponent },

  // Rutas empresa
  { path: 'empresa/dashboard', component: CompanyDashboardComponent },
  { path: 'empresa/verAlumnos', component: StudensViewComponent },
  { path: 'empresa', component: CompanyDashboardComponent },
  { path: 'empresa/ofertas', component: CompanyOfferComponent },
  { path: 'empresa/perfil', component: ViewProfileComponent2 },
  { path: 'empresa/Crearperfil', loadChildren: () => import('./pages/company/crear-perfil/crear-perfil.module').then(m => m.CrearPerfilModule) },

  //Rutas alumno
  { path: 'alumno/perfil', component: ViewProfileComponent },
  { path: 'alumno/dashboard', component: StudentDashboardComponent },
  { path: 'alumno/ofertas', component: StudentOfferComponent },
  { path: 'registro', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule) },
  { path: 'alumno/empresa-view', component: StudentCompanyViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

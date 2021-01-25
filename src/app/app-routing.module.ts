import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { CrearPerfilComponent } from './pages/company/crear-perfil/crear-perfil.component';
import { RegisterComponent } from './pages/register/register.component';



const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'inicio', component: HomeComponent},

  // Rutas admin
  {path: 'admin/dashboard', component: AdminDashboardComponent},
  { path: 'registro', component: RegisterComponent },
  { path: 'empresa/Crearperfil', loadChildren: () => import('./pages/company/crear-perfil/crear-perfil.module').then(m => m.CrearPerfilModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

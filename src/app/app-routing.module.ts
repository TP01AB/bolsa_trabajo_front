import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { CompanyDashboardComponent } from './pages/company/company-dashboard/company-dashboard.component';
import { CompanyOfferComponent } from './pages/company/company-offer/company-offer.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'inicio', component: HomeComponent},

  // Rutas admin
  {path: 'admin', component: AdminDashboardComponent},

  // Rutas company
  {path: 'empresa', component: CompanyDashboardComponent},
  {path: 'empresa/ofertas', component: CompanyOfferComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

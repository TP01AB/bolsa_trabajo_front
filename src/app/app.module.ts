import { CrearPerfilModule } from './pages/company/crear-perfil/crear-perfil.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app-component/app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './shared/footer/footer.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { ModalStudentComponent } from './pages/company/studens-view/modal-student/modal-student.component';
import { StudensViewComponent } from './pages/company/studens-view/studens-view.component';
import { CrearPerfilComponent } from './pages/company/crear-perfil/crear-perfil.component';
import { PerfilAlComponent } from './pages/alumno/perfil/perfil-al.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    HomeComponent,
    FooterComponent,
    AdminDashboardComponent,
    StudensViewComponent,
    ModalStudentComponent
    PerfilAlComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    CrearPerfilModule
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

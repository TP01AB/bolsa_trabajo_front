import { CrearPerfilModule } from './pages/company/crear-perfil/crear-perfil.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app-component/app.component';
import { AlumnoModule } from './pages/alumno/alumno.module';
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

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    CrearPerfilModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

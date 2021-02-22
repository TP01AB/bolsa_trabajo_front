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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './auth/login/login.component';
import { OfferDeleteComponent } from './pages/company/company-offer/modal/offer-delete/offer-delete.component';
import { OfferUpdateComponent } from './pages/company/company-offer/modal/offer-update/offer-update.component';
import { OfferNewComponent } from './pages/company/company-offer/modal/offer-new/offer-new.component';
import { CompanyOfferComponent } from './pages/company/company-offer/company-offer.component';
import { CompanyDashboardComponent } from './pages/company/company-dashboard/company-dashboard.component';
import { OfferDuplicateComponent } from './pages/company/company-offer/modal/offer-duplicate/offer-duplicate.component';
import { StudentDashboardComponent } from './pages/alumno/student-dashboard/student-dashboard.component';
import { PerfilAlModule } from './pages/alumno/perfil/perfil-al.module';
import { ViewProfileComponent } from './pages/alumno/view-profile/view-profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadSpinnerModule } from './shared/load-spinner/load-spinner.module';
import { ViewProfileComponent2 } from './pages/company/view-profile/view-profile.component';
import { UsersCrudComponent } from './pages/admin/users-crud/users-crud.component';
import { UserDeleteComponent } from './pages/admin/users-crud/modal/user-delete/user-delete.component';
import { UserUpdateComponent } from './pages/admin/users-crud/modal/user-update/user-update.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    HomeComponent,
    FooterComponent,
    AdminDashboardComponent,
    StudensViewComponent,
    ModalStudentComponent,
    CompanyDashboardComponent,
    CompanyOfferComponent,
    OfferNewComponent,
    OfferUpdateComponent,
    OfferDeleteComponent,
    LoginComponent,
    OfferDuplicateComponent,
    StudentDashboardComponent,
    ViewProfileComponent,
    ViewProfileComponent2,
    UsersCrudComponent,
    UserDeleteComponent,
    UserUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    PerfilAlModule,
    LoadSpinnerModule,
    CrearPerfilModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }

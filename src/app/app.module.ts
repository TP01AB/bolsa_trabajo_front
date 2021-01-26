import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app-component/app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './shared/footer/footer.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { CompanyDashboardComponent } from './pages/company/company-dashboard/company-dashboard.component';
import { CompanyOfferComponent } from './pages/company/company-offer/company-offer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OfferNewComponent } from './pages/company/company-offer/pop-up/offer-new/offer-new.component';
import { OfferUpdateComponent } from './pages/company/company-offer/pop-up/offer-update/offer-update.component';
import { OfferDeleteComponent } from './pages/company/company-offer/pop-up/offer-delete/offer-delete.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    HomeComponent,
    FooterComponent,
    AdminDashboardComponent,
    CompanyDashboardComponent,
    CompanyOfferComponent,
    OfferNewComponent,
    OfferUpdateComponent,
    OfferDeleteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }

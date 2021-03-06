import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { IndexComponent } from './pages/index/index.component';
import { ProductComponent } from './pages/product/product.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ImpactComponent } from './pages/impact/impact.component';
import { OrderCompletedComponent } from './pages/order-completed/order-completed.component';
import { OrderHistoryComponent } from './pages/order-history/order-history.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { TermsConditionComponent } from './pages/terms-condition/terms-condition.component';
import { LoginComponent } from './account/login/login.component';
import { SignUpComponent } from './account/sign-up/sign-up.component';
import { ProductDisplayComponent } from './pages/product-display/product-display.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxPayPalModule } from 'ngx-paypal';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    IndexComponent,
    ProductComponent,
    CheckoutComponent,
    AboutUsComponent,
    ContactComponent,
    ImpactComponent,
    OrderCompletedComponent,
    OrderHistoryComponent,
    PrivacyPolicyComponent,
    TermsConditionComponent,
    LoginComponent,
    SignUpComponent,
    ProductDisplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxPayPalModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard/auth-guard.service';
import { LoginComponent } from '../account/login/login.component';
import { SignUpComponent } from '../account/sign-up/sign-up.component';
import { IndexComponent } from '../pages/index/index.component';
import { AboutUsComponent } from '../pages/about-us/about-us.component';
import { OrderHistoryComponent } from '../pages/order-history/order-history.component';
import { CheckoutComponent } from '../pages/checkout/checkout.component';
import { ContactComponent } from '../pages/contact/contact.component';
import { ImpactComponent } from '../pages/impact/impact.component';
import { OrderCompletedComponent } from '../pages/order-completed/order-completed.component';
import { PrivacyPolicyComponent } from '../pages/privacy-policy/privacy-policy.component';
import { ProductComponent } from '../pages/product/product.component';
import { TermsConditionComponent } from '../pages/terms-condition/terms-condition.component';

const Route: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'signin', component: LoginComponent
  },
  {
    path: 'signup', component: SignUpComponent
  },
  {
    path: 'home', component: IndexComponent
  },
  {
    path: 'product-detail', component: ProductComponent
  },
  {
    path: 'my-order', component: OrderHistoryComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'order-completed', component: OrderCompletedComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'about-us', component: AboutUsComponent
  },
  {
    path: 'contact', component: ContactComponent
  },
  {
    path: 'privacy-policy', component: PrivacyPolicyComponent
  },
  {
    path: 'terms-condition', component: TermsConditionComponent
  },
  {
    path: 'impact', component: ImpactComponent
  },
  {
    path: '**', redirectTo: '/home'
  }
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(Route)
  ]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AuthGuardGuard } from './auth-guard.guard';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContactComponent } from './contact/contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { NewProductComponent } from './new-product/new-product.component';
import { ProductsComponent } from './products/products.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path:"login",
    component: LoginComponent
  },
  {
    path:"dashboard",
    component: DashboardComponent
  },
  {
    path:"",
    component: DashboardComponent
  },
  {
    path:"allProducts",
    component: ProductsComponent
  },
  {
    path:"contact",
    component: ContactComponent
  },
  {
    path:"about",
    component: AboutComponent
  },
  {
    path:"cart",
    component: CartComponent
  },
  {
    path:"register",
    component: RegisterComponent
  },
  {
    path:"checkout",
    component: CheckoutComponent,
    canActivate:[AuthGuardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

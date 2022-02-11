import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './auth-guard.guard';
import { ContactComponent } from './contact/contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { LoginComponent } from './login/login.component';
import { NewProductComponent } from './new-product/new-product.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  {
    path:"",
    component: LoginComponent
  },
  {
    path:"dashboard",
    component: DashboardComponent,
    canActivate:[AuthGuardGuard]
  },
  {
    path:"newProduct",
    component: NewProductComponent,
    canActivate:[AuthGuardGuard]
  },
  {
    path:"invoice/:id",
    component: InvoiceComponent,
    canActivate:[AuthGuardGuard]
  },
  {
    path:"allProducts",
    component: ProductsComponent,
    canActivate:[AuthGuardGuard]
  },
  {
    path:"contact",
    component: ContactComponent,
    canActivate:[AuthGuardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

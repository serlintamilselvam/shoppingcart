import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './views/signup/signup.component';
import { UserloginComponent } from './views/userlogin/userlogin.component';
import { ProductlistComponent } from './views/productlist/productlist.component'
import { CartComponent } from './views/cart/cart.component'

const routes: Routes = [{ 
    path: 'signup', 
    component: SignupComponent 
  }, { 
    path: 'login', 
    component: UserloginComponent 
  }, {
    path: 'productlist/:categoryId',
    component: ProductlistComponent
  }, {
    path: 'cart',
    component: CartComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

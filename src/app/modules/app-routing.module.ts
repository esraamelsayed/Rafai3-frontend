import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { CartComponent } from '../components/cart/cart.component';
import { UserViewOrdersComponent } from '../components/orders/user-view-orders/user-view-orders/user-view-orders.component';
import { OrderDetailsComponent } from '../components/orders/order-details/order-details.component';
import { AdminControlOrdersComponent } from '../components/orders/orders-admin-control/admin-control-orders/admin-control-orders.component';
import { LoginFormComponent } from '../components/login-form/login-form.component';
import { SignFormComponent } from '../components/sign-form/sign-form.component';


const routes:Routes=[
  {path:'home',pathMatch:'full',component:HomeComponent},
  {path:'user/login',pathMatch:'full',component:LoginFormComponent},
  {path:'user/register',pathMatch:'full',component:SignFormComponent},
  {path:'user/cart',pathMatch:'full',component:CartComponent},
  {path:'user/order',pathMatch:'full',component:UserViewOrdersComponent},
  {path:'user/order/:id',pathMatch:'prefix',component:OrderDetailsComponent},
  {path:'admin/order',pathMatch:'full',component:AdminControlOrdersComponent},
  {path:'admin/order/:id',pathMatch:'prefix',component:OrderDetailsComponent},
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }

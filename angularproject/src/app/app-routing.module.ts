import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginformComponent } from './loginform/loginform.component';
import { ProductmanagementComponent } from './productmanagement/productmanagement.component';
import { ProfileComponent } from './profile/profile.component';
import { Report1Component } from './report1/report1.component';
import { SalemanagementComponent } from './salemanagement/salemanagement.component';
import { AuthGuard } from './services/auth.guard';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path : '' , component : LoginformComponent },
  {path : 'loginform' , component : LoginformComponent },
  {path : 'productmanagement' , component: ProductmanagementComponent, canActivate:[AuthGuard]},
  {path : 'salemanagement' , component: SalemanagementComponent, canActivate:[AuthGuard]},
  {path : 'report1' , component: Report1Component, canActivate:[AuthGuard]},
  {path : 'signup', component: SignupComponent},
  {path : 'profile', component: ProfileComponent, canActivate:[AuthGuard]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

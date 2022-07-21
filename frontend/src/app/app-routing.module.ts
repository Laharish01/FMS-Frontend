import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './booking/booking.component';
import { AdminComponent } from './Components/admin/admin.component';
import { HomeComponent } from './Components/home/home.component';
import { PaymentsComponent } from './Components/payments/payments.component';
import { UserprofileComponent } from './Components/userprofile/userprofile.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  // {path: 'home', component:HomeComponent}, 
  {path: 'signUp',component: SignUpComponent},
  // {path: 'admin', component: AdminComponent}, 
  {path: 'book', component:BookingComponent},
  {path: 'payment', component:PaymentsComponent}, 
  {path:'home', component:HomeComponent},
  {path:'admin/:un', component:AdminComponent}, 
  {path: 'profile', component:UserprofileComponent},
  {path: '', pathMatch:'full', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

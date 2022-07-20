import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './Components/admin/admin.component';
import { PaymentsComponent } from './Components/payments/payments.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', pathMatch:'full', redirectTo: 'login'},
  {path: 'signUp',component: SignUpComponent},
  {path: 'admin', component: AdminComponent}, 
  {path: 'payment', component:PaymentsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

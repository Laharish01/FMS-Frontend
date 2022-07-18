import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {HttpClientModule} from '@angular/common/http';
import { BookingComponent } from './booking/booking.component';
<<<<<<< HEAD
import { SignUpComponent } from './sign-up/sign-up.component';
=======
import { AdminComponent } from './Components/admin/admin.component';
>>>>>>> be7c403ef74fe315012ba9683c7823eeebbe747b
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BookingComponent,
<<<<<<< HEAD
    SignUpComponent
=======
    AdminComponent
>>>>>>> be7c403ef74fe315012ba9683c7823eeebbe747b
  ],
  //import formsModule, httclient etc over here
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],  //add services here
  bootstrap: [AppComponent]
})
export class AppModule { }

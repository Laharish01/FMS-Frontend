import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {HttpClientModule} from '@angular/common/http';
import { BookingComponent } from './booking/booking.component';
import { UserService } from './Service/User/user.service';
import { BookingService } from './Service/Booking/booking.service';
import { FlightService } from './Service/Flight/flight.service';
import { AdminComponent } from './Components/admin/admin.component';
import { SignUpComponent } from './sign-up/sign-up.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BookingComponent,
    SignUpComponent,
    AdminComponent
  ],
  //import formsModule, httclient etc over here
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [UserService, BookingService, FlightService],  //add services here
  bootstrap: [AppComponent]
})
export class AppModule { }

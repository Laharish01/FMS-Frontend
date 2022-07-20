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
import { PaymentsComponent } from './Components/payments/payments.component';
import { HomeComponent } from './Components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatFormFieldControl, MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import { NotfoundComponent } from './Components/notfound/notfound.component';
import { UserprofileComponent } from './Components/userprofile/userprofile.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BookingComponent,
    SignUpComponent,
    AdminComponent,
    PaymentsComponent,
    HomeComponent,
    NotfoundComponent,
    UserprofileComponent
  ],
  //import formsModule, httclient etc over here
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule, 
    BrowserAnimationsModule, 
    MatToolbarModule, 
    MatIconModule, 
    MatDatepickerModule, 
    MatNativeDateModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatRadioModule
  ],
  providers: [UserService, BookingService, FlightService],  //add services here
  bootstrap: [AppComponent]
})
export class AppModule { }

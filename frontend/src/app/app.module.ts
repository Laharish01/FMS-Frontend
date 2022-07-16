import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  //import formsModule, httclient etc over here
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],  //add services here
  bootstrap: [AppComponent]
})
export class AppModule { }

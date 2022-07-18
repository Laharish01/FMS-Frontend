import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userName: string = '';
  password: string = '';
  submitted = false; 
  constructor() { }

  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9]*$")]), 
    password: new FormControl('',[Validators.required, Validators.minLength(8)])
  })

  get f(){
    return this.form.controls;
  }

  submit(){
    this.submitted = true;
    console.log(this.form.value);   
  }


}

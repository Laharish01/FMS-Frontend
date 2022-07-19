import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  username: string = '';
  password: string = '';
  SeatType:String='';
  submitted = false;
  constructor() { }
  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9]*$")]),
    password: new FormControl('',[Validators.required, Validators.minLength(8),Validators.pattern("/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$")]),
    SeatType: new FormControl('',[Validators.required])
  })
  ngOnInit(): void {
  }
  get f(){
    return this.form.controls;
  }

  submit(){
    this.submitted = true;
    console.log(this.form.value);
    this.form.reset();

  }
}

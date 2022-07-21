import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {FormGroup, Validators} from '@angular/forms';
import { User } from '../Model/User/user';
import { UserService } from '../Service/User/user.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  username: string = '';
  password: string = '';
  SeatType:String='';
  user:User; 
  submitted = false;
  constructor(private userService:UserService) { 
    this.user = new User(); 
    this.user.role = "Customer";
  }
  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9]*$")]),
    password: new FormControl('',[Validators.required, Validators.minLength(8)]),
    SeatType: new FormControl('',[Validators.required])
  })
  ngOnInit(): void {
  }
  get f(){
    return this.form.controls;
  }

  submit(){
    this.submitted = true;
    if(!this.form.controls.username.errors){
      this.user.username = this.form.value['username'];
    }
    if (!this.form.controls.password.errors){
      this.user.password = this.form.value['password']; 
    }
    if(!this.form.controls.SeatType.errors){
      this.user.seat_preference = this.form.value['SeatType'];
    }
    console.log(this.user);
    this.userService.AddUser(this.user).subscribe(response => {
        console.log(response);
    }, error => {
      alert(error.message);
      this.user = new User(); 
      this.user.role = "Customer"
      this.submitted = false; 
    });
  }
}

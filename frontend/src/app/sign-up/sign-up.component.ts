import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {FormGroup, Validators} from '@angular/forms';
import { User } from '../Model/User/user';
import { UserService } from '../Service/User/user.service';
import { Router } from '@angular/router';
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
  constructor(private userService:UserService, private router:Router) { 
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
    if(!this.form.controls.SeatType.errors && !this.form.controls.username.errors && !this.form.controls.password.errors){
      this.user.seat_preference = this.form.value['SeatType'];
      this.user.password = this.form.value['password']; 
      this.user.username = this.form.value['username'];
      console.log(this.user);
      this.userService.AddUser(this.user).subscribe(response => {
          alert("Sucessfully signed up!!");
          localStorage.setItem("username", this.user.username);
          this.router.navigateByUrl('home');
  
      }, error => {
        console.log(error);
        alert("Username already exists. Please enter another username");
        this.form.reset();
        this.user = new User(); 
        this.user.role = "Customer"
        this.submitted = false; 
      });
    } 
  }
}

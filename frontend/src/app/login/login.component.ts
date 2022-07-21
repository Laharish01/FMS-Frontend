import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../Model/User/user';
import { UserService } from '../Service/User/user.service';
import { map, delay } from "rxjs/operators";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userName: string = '';
  password: string = '';
  available: boolean; 
  user:User; 
  // users: User[]
  submitted = false;
  constructor(private userService:UserService, private router:Router) {}

  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9]*$")]),
    password: new FormControl('',[Validators.required, Validators.minLength(8)])
  })

  get f(){
    return this.form.controls;
  }

  async submit(){
    this.submitted = true;
    console.log(this.form.value);
    if(!this.form.controls.username.errors && !this.form.controls.password.errors){
      this.available = await this.userService.CheckUser(this.form.value['username']).pipe(delay(1000)).toPromise();
        if(this.available){
            this.user = await this.userService.GetUser(this.form.value['username']).pipe(delay(1000)).toPromise();
            if(this.user){
              if(this.user.password == this.form.value['password']){
                if(this.user.role == "Admin"){
                  this.router.navigateByUrl("admin/" + this.user.username);
                }
                else{
                  this.router.navigateByUrl("home/" + this.user.username);
                }
              }
              else{
                alert("Incorrect Password"); 
                this.form.value.password = "";
              } 
            }
        }
        else{
          alert("The user doesn't exist");
          this.submitted = false;
          this.form.reset();
        }
    }
  }


}

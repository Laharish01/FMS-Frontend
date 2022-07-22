import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Flight } from '../Model/Flight/flight';
import { User } from '../Model/User/user';
import { UserService } from '../Service/User/user.service';
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  flight:Flight;
  user:User;
  username:string;
  constructor(private router:Router, private userService:UserService) { 
    this.flight = JSON.parse(localStorage.getItem("flight"));
    console.log(this.flight);
    this.username = localStorage.getItem("username");
    this.userService.GetUser(this.username).subscribe(res => {this.user = res;}); 
  }

  ngOnInit(): void {
  }
  pay(){
    localStorage.setItem("price", (this.user.seat_preference == "Economy" ? this.flight.economy_price : this.flight.business_price).toString());
    this.router.navigateByUrl("payment");
  }

}

import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import { BookingComponent } from 'src/app/booking/booking.component';
import { User } from 'src/app/Model/User/user';
import { Userbookings } from 'src/app/Model/UserBookings/userbookings';
import { BookingService } from 'src/app/Service/Booking/booking.service';
import { UserService } from 'src/app/Service/User/user.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  username:string; 
  user:User; 
  bookings:Userbookings[];
  constructor(private router:Router, private activatedRoute:ActivatedRoute, private userService:UserService, private bookingService:BookingService) { 
    this.username = localStorage.getItem('username');
    this.userService.GetUser(this.username).subscribe(response => {
      this.user = response;
    });
    this.bookingService.GetUserBookings(this.username).subscribe(response => {
      this.bookings = response;
    }); 
  }

  ngOnInit(): void {
  }

}

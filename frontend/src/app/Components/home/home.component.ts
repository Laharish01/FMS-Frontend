import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Cities } from 'src/app/Model/Cities/cities';
import { User } from 'src/app/Model/User/user';
import { FlightService } from 'src/app/Service/Flight/flight.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map, delay } from 'rxjs/operators';
import { Flight } from 'src/app/Model/Flight/flight';
import { UserService } from 'src/app/Service/User/user.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  username: string;
  source: string = '';
  destination: string = '';
  submitted = false;
  flights = false;
  city: Cities[];
  departure_time: Date;
  available_flights: Flight[];
  available_seats: number;
  user:User;

  form = new FormGroup({
    source: new FormControl('', [Validators.required, Validators.minLength(3)]),
    destination: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    departure_time: new FormControl('', [Validators.required]),
  });

  constructor(
    private flightService: FlightService,
    private router: Router,
    private activatedRoute: ActivatedRoute, 
    private userService:UserService
  ) {
    this.city = [
      { name: 'Delhi' },
      { name: 'Mumbai' },
      { name: 'Bangalore' },
      { name: 'Jaipur' },
    ];
    this.username = localStorage.getItem('username');
    userService.GetUser(this.username).subscribe(res => {this.user = res;});
  }
  get f() {
    return this.form.controls;
  }
  submit() {
    if (this.username) {
      this.submitted = true;
      console.log(this.form);

      //set this in service subscribe call to display the table
      this.flights = true;

      this.flightService.GetFilteredFlights(this.form.value.source, this.form.value.destination, this.form.value.departure_time, this.user.seat_preference).subscribe(res => {
        this.available_flights = res;
      });
    } else {
      alert('You have to login first!!!');
      this.form.reset();
    }
  }
  ngOnInit(): void {}

  book(flight:Flight){
     console.log(flight);
     localStorage.setItem("flight", JSON.stringify(flight));
     this.router.navigateByUrl("booking");
  }
}

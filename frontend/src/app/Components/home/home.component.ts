import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Availableflightwithseat } from 'src/app/Model/AvailableFlightWithSeat/availableflightwithseat';
import { Cities } from 'src/app/Model/Cities/cities';
import { User } from 'src/app/Model/User/user';
import { FlightService } from 'src/app/Service/Flight/flight.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map, delay } from 'rxjs/operators';
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
  available_flights: Availableflightwithseat[];
  available_seats: number;

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
    private activatedRoute: ActivatedRoute
  ) {
    this.city = [
      { name: 'Delhi' },
      { name: 'Mumbai' },
      { name: 'Bangalore' },
      { name: 'Jaipur' },
    ];
    this.username = localStorage.getItem('username');
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

      this.flightService.GetFilteredFlights(this.form.value.source, this.form.value.destination, this.form.value.departure_time).subscribe(res => {
        this.available_flights = res;
      });
      this.flightService.GetCount("6E4569", 'Economy').subscribe(res => {
        this.available_seats = res;
      });
    } else {
      alert('You have to login first!!!');
      this.form.reset();
    }
  }
  ngOnInit(): void {}

  book(){
    
  }
}

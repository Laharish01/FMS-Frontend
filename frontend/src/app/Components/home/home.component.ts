import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Availableflightwithseat } from 'src/app/Model/AvailableFlightWithSeat/availableflightwithseat';
import { Cities } from 'src/app/Model/Cities/cities';
import { User } from 'src/app/Model/User/user';
import { FlightService } from 'src/app/Service/Flight/flight.service';
import {Router, ActivatedRoute} from "@angular/router";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username:string;
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
    destination: new FormControl('', [Validators.required, Validators.minLength(3)]),
    departure_time: new FormControl(Date, [Validators.required])
  })

  constructor(private flightService:FlightService, private router:Router, private activatedRoute:ActivatedRoute) {
    this.city = [
      { name: 'Delhi' },
      { name: 'Mumbai' },
      { name: 'Bangalore' },
      { name: 'Jaipur' },
    ];
    this.activatedRoute.params.subscribe(p => this.username = p['un']);
  }
  get f() {
    return this.form.controls;
  }
  submit() {
    this.submitted = true;
    // console.log(this.form.value);
    //set this in service subscribe call to display the table 
    this.flights = true;
      
      this.flightService.GetFilteredFlights(this.source, this.destination, this.departure_time).subscribe(response => {
        this.available_flights = response;
      });
      this.flightService.GetCount("6E4567").subscribe(response => {
        this.available_seats = response;
      })
      
  }
  ngOnInit(): void {
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Availableflightwithseat } from 'src/app/Model/AvailableFlightWithSeat/availableflightwithseat';
import { Cities } from 'src/app/Model/Cities/cities';
import { User } from 'src/app/Model/User/user';
import { FlightService } from 'src/app/Service/Flight/flight.service';
import {Router, ActivatedRoute} from "@angular/router";
import { map, delay } from "rxjs/operators";
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
    this.username = localStorage.getItem("username");
  }
  get f() {
    return this.form.controls;
  }
  async submit() {
    if(this.username){
      this.submitted = true;
    // console.log(this.form.value);
    //set this in service subscribe call to display the table 
      this.flights = true;
      
      this.available_flights = await this.flightService.GetFilteredFlights(this.source, this.destination, this.departure_time).pipe(delay(1000)).toPromise();
      this.available_seats = await this.flightService.GetCount("6E4567").pipe(delay(1000)).toPromise();  

    }
    else{
      alert("You have to login first!!!"); 
      this.form.reset();
    }
    
  }
  ngOnInit(): void {
  }
}

import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Flight } from 'src/app/Model/Flight/flight';
import { FlightService } from 'src/app/Service/Flight/flight.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  submitted = false;
  flight: Flight;
  constructor(private flightService : FlightService) {
    this.flight = new Flight();
   }

  ngOnInit(): void {
  }

  form = new FormGroup({
    flight_id: new FormControl('', Validators.required),
    flight_cmp: new FormControl('', Validators.required),
    source: new FormControl('', Validators.required),
    destination: new FormControl('', Validators.required),
    departure_time: new FormControl('', Validators.required),
    landing_time: new FormControl('', Validators.required)
  });

  get f() {
    return this.form.controls;
  }

  addFlight() {
    this.submitted = true;
    console.log(this.form.value);

    this.flight.flight_id =  this.form.value.flight_id;
    this.flight.flight_cmp =  this.form.value.flight_cmp;
    this.flight.source =  this.form.value.source;
    this.flight.destination =  this.form.value.destination;
    this.flight.departure_time =  new Date(this.form.value.departure_time);
    this.flight.landing_time = new Date(this.form.value.landing_time);
    
    this.flightService.AddFlight(this.flight).subscribe(response =>{
      console.log(response);
    });
    this.form.reset();
  }

}

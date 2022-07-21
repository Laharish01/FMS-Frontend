import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Flight } from 'src/app/Model/Flight/flight';
import { FlightService } from 'src/app/Service/Flight/flight.service';
import { Seat } from 'src/app/Model/Seat/seat';
import { BookingService } from 'src/app/Service/Booking/booking.service';
import { Availableflightwithseat } from 'src/app/Model/AvailableFlightWithSeat/availableflightwithseat';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  submitted = false;
  flight: Flight;
  rawseats: string[];
  all_flights: Flight[];
  available_flights: Availableflightwithseat[];
  source: string;
  destination: string;
  departure_time: Date;
  available_seats: number;
  constructor(
    private flightService: FlightService,
    private bookingService: BookingService
  ) {
    this.flight = new Flight();
    this.flightService.GetAllFlights().subscribe((response) => {
      this.all_flights = response;
    });
  }

  ngOnInit(): void {}

  form = new FormGroup({
    flight_id: new FormControl('', Validators.required),
    flight_cmp: new FormControl('', Validators.required),
    source: new FormControl('', Validators.required),
    destination: new FormControl('', Validators.required),
    departure_time: new FormControl('', Validators.required),
    landing_time: new FormControl('', Validators.required),
  });

  addseat = new FormGroup({
    seats: new FormControl('', Validators.pattern('[E,B]d+')),
  });

  get f() {
    return this.form.controls;
  }

  get s() {
    return this.addseat.controls;
  }

  addFlight() {
    this.submitted = true;
    console.log(this.form.value);

    this.flight.flight_id = this.form.value.flight_id;
    this.flight.flight_cmp = this.form.value.flight_cmp;
    this.flight.source = this.form.value.source;
    this.flight.destination = this.form.value.destination;
    this.flight.departure_time = new Date(this.form.value.departure_time);
    this.flight.landing_time = new Date(this.form.value.landing_time);

    this.flightService.AddFlight(this.flight).subscribe((response) => {
      console.log(response);
    });
    this.form.reset();
  }

  async addSeats() {
    this.rawseats = this.addseat.value.seats.split(',');
    this.rawseats.forEach((element) => {
      var total_no = element.substring(1);
      for (var i = 0; i < Number(total_no); i++) {
        var seat = new Seat();

        // seat.flight_id = this.flight.flight_id;
        seat.flight_id = '6E4569';
        seat.price = element[0] == 'E' ? 3000 : 6000;
        seat.seat_class = element[0] == 'E' ? 'Economy' : 'Business';
        seat.seat_no = i + 1;
        seat.status = false;

        this.bookingService.AddSeat(seat).subscribe((response) => {
          console.log(response);
        });
      }
    });
  }
  getFlightList() {
    this.flightService
      .GetFilteredFlights(this.source, this.destination, this.departure_time)
      .subscribe((response) => {
        this.available_flights = response;
      });
    this.flightService.GetCount('6E4567').subscribe((response) => {
      this.available_seats = response;
    });
  }
}

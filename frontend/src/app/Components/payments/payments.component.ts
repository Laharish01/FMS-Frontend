import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingService } from 'src/app/Service/Booking/booking.service';
import { Bookings } from 'src/app/Model/Bookings/bookings';
import { Payment } from 'src/app/Model/Payment/payment';
import { map, delay } from "rxjs/operators";
import { FlightService } from 'src/app/Service/Flight/flight.service';
import { User } from 'src/app/Model/User/user';
import { UserService } from 'src/app/Service/User/user.service';
@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css'],
})
export class PaymentsComponent implements OnInit {
  paymentHandler: any = null;
  price:number;
  username:string;
  user:User;
  constructor(private router:Router, private bookingService:BookingService, private flightService:FlightService, private userService:UserService) {
    this.price = Number(localStorage.getItem("price"));
    this.username = localStorage.getItem("username"); 
    this.userService.GetUser(this.username).subscribe(res => {this.user = res;});
  }

  ngOnInit() {
    this.invokeStripe();
  }

  async initializePayment(amount: number) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51KFG5eSBjSw1UXqU0bmIQ2IjKwPEAAtoNZDZBY8G2kbcmFRXZ6fMapBAM66AMVGQeRvhD3QarzzLEDjJejJqmQXt00QLEzsHLi',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log({ stripeToken });
        alert('Payment Successful!');
      },
      
    });

    paymentHandler.open({
      name: 'Concept Squad',
      description: 'Booking flights at the best rates!!',
      amount: this.price * 100,
      currency: "inr"
    });
    await this.updateDB();
    this.router.navigateByUrl('home');
  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51KFG5eSBjSw1UXqU0bmIQ2IjKwPEAAtoNZDZBY8G2kbcmFRXZ6fMapBAM66AMVGQeRvhD3QarzzLEDjJejJqmQXt00QLEzsHLi',
          locale: 'auto',
          
          token: function (stripeToken: any) {
            console.log(stripeToken);
            alert('Payment has been successfull!');

          },
        });
      };
      window.document.body.appendChild(script);
    }
  }
  async updateDB(){
    var payment= new Payment(); 
    var payment_size = 0;
    payment_size = await this.bookingService.GetPaymentCount().pipe(delay(1000)).toPromise();
    payment.payment_id = payment_size + 1; 
    payment.payment_mode = "Card"; 
    payment.total_amount = this.price; 
    payment.status = true;
    await this.bookingService.AddPayment(payment).subscribe(res => {console.log(res)});
    var booking = new Bookings();
    booking.payment_id = payment.payment_id;
    var booking_size = 0; 
    booking_size = await this.bookingService.GetBookingCount().pipe(delay(1000)).toPromise();
    booking.booking_id = booking_size + 1; 
    booking.flight_id = JSON.parse(localStorage.getItem("flight")).flight_id;
    booking.username = localStorage.getItem("username");
    console.log(booking);
    await this.bookingService.AddBooking(booking).subscribe(res => {console.log(res)});
    console.log(booking.flight_id);
    await this.flightService.BookSeat(booking.flight_id,this.user.seat_preference).subscribe(res => {console.log(res);});
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import { Bookings} from 'src/app/Model/Bookings/bookings';
import { Userbookings } from 'src/app/Model/UserBookings/userbookings';
import { Observable } from 'rxjs';
import { Payment } from 'src/app/Model/Payment/payment';
import { Bookedseats } from 'src/app/Model/BookedSeats/bookedseats';
import { Seat } from 'src/app/Model/Seat/seat';
@Injectable({
  providedIn: 'root'
})
export class BookingService {
  api_url:string = environment.booking_api;
  constructor(private httpClient: HttpClient) { }
  
  AddBooking(booking:Bookings):Observable<any>{
    return this.httpClient.post(this.api_url + 'addbooking',booking );
  }
  GetUserBookings(username:string):Observable<Userbookings[]> {
    return this.httpClient.get<Userbookings[]>(this.api_url + 'getuserbookings/' + username);
  }
  AddPayment(payment:Payment):Observable<any>{
    return this.httpClient.post(this.api_url + 'addpayment/', payment);
  }
  GetPaymentCount():Observable<any>{
    return this.httpClient.get(this.api_url + 'getpaymentcount');
  }
  GetBookingCount():Observable<any>{
    return this.httpClient.get(this.api_url + 'getbookingcount');
  }
}


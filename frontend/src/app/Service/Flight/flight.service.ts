import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import { Flight } from 'src/app/Model/Flight/flight';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class FlightService {
  api_url:string = environment.flight_api;
  constructor(private httpClient:HttpClient) { }

  GetFilteredFlights(source:string, destination:string, departure_time:string, seat_preference:string):Observable<Flight[]>{
    return this.httpClient.get<Flight[]>(this.api_url + 'getfilteredflights?source=' + source + '&destination=' + destination + '&departure_time=' + departure_time+'T00:00:00' + '&seat_preference='+ seat_preference);
  }
  AddFlight(flight: Flight):Observable<any>{
    return this.httpClient.post(this.api_url + "addflight", flight);
  }
  BookSeat(flight_id:string, class_type: string):Observable<any>{
    return this.httpClient.get(this.api_url  + "bookseat/" + flight_id + '/' + class_type);
  }
}

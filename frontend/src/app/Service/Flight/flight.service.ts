import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import { Flight } from 'src/app/Model/Flight/flight';
import { Observable } from 'rxjs';
import { Availableflightwithseat } from 'src/app/Model/AvailableFlightWithSeat/availableflightwithseat';


@Injectable({
  providedIn: 'root'
})
export class FlightService {
  api_url:string = environment.flight_api;
  constructor(private httpClient:HttpClient) { }
  GetAllFlights():Observable<Flight[]>{
    return this.httpClient.get<Flight[]>(this.api_url + 'getallflights')
  }
  GetFilteredFlights(source:string, destination:string):Observable<Availableflightwithseat[]>{
    return this.httpClient.get<Availableflightwithseat[]>(this.api_url + 'getfilteredflights?source=' + source + '&destination=' + destination);
  }
}

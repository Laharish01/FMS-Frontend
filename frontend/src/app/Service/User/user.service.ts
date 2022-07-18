import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import { User } from 'src/app/Model/User/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  api_url:string = environment.user_api;
  constructor(private httpClient: HttpClient) { }
  AddUser(user: User):Observable<any>{
    return this.httpClient.post(this.api_url + 'adduser', user);
  }
  CheckAdmin(user:User):Observable<any>{
    return this.httpClient.post(this.api_url + 'checkadmin', user);
  }
}

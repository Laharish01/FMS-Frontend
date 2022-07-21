import { Component, OnChanges } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnChanges{
  title = 'frontend';
  username:string; 
  constructor(){
    this.username = localStorage.getItem("username");
  }
  ngOnChanges() {
    this.username = localStorage.getItem("username");
  }
}

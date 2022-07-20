import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { Cities } from 'src/app/Model/Cities/cities';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  source:string='';
  destination:string='';
  submitted=false;
  city:Cities[];
  form = new FormGroup({
  source: new FormControl('',[Validators.required, Validators.minLength(3)]),
  destination: new FormControl('',[Validators.required, Validators.minLength(3)])
  })

  constructor() {
    this.city=[
      {name:'Delhi'},
      {name:'Mumbai'},
      {name:'Bangalore'},
      {name:'Jaipur'},
     ];
  }
  get f(){
    return this.form.controls;
  }
submit()
{
  this.submitted=true;
  console.log(this.form.value);
}
  ngOnInit(): void {
  }
}

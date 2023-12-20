import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  registerMode = true;

  users:any;

constructor(private http:HttpClient){}

  ngOnInit(): void {
 this.registerToggle();
 this.get_user();
}


registerToggle()
{
this.registerMode = !this.registerMode;
}



get_user()
{
this.http.get('https://localhost:7097/api/users').subscribe(users=> this.users = users);
}


CancelRegisterMode(event:boolean)
{
this.registerMode = event;
}
}
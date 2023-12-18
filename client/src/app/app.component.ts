import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Data client';

  users: any;
  constructor(private http: HttpClient)
   {}

  ngOnInit(): void {
  this.getUsers(); 
  }

  getUsers()
  {
    this.http.get('https://localhost:7097/api/users').subscribe(Response =>
    {
      this.users = Response;
    }, error =>{
      console.log(error);
    })
  }
}

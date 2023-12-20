import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { User } from './Models/user';
import { AccountService } from './services/account.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Data client';

  users: any;
  constructor(private http: HttpClient,private accountservice : AccountService)
   {}

  ngOnInit(): void {
  this.setCurrentUser();
  }

  setCurrentUser(){
   const user: User = JSON.parse(localStorage.getItem('user'));
   this.accountservice.setCurrenyUser(user);
  }

 
}

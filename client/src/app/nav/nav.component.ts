import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { Observable, Subscriber } from 'rxjs';
import { flush } from '@angular/core/testing';
import { User } from '../Models/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  
model:any = {}

  constructor(public accountservice:AccountService){}
  
  ngOnInit(): void {
    this.accountservice.currentUser$;
  }

  login() {
    this.accountservice.login(this.model).subscribe(respons=>{
      console.log(respons);
      
    }, error=>{
      console.log(error);
    })
  }

  logout()
  {
   this.accountservice.logout();
  }

  

}

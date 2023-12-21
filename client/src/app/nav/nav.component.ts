import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { Observable, Subscriber } from 'rxjs';
import { flush } from '@angular/core/testing';
import { User } from '../Models/user';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  
model:any = {}

  constructor(public accountservice:AccountService, private router: Router,private tosta:ToastrService){}
  
  ngOnInit(): void {
    this.accountservice.currentUser$;
  }

  login() {
    this.accountservice.login(this.model).subscribe(respons=>{
      this.router.navigateByUrl('/members');
      console.log(respons);
      
    }, error=>{
      console.log(error);
      this.tosta.error(error.error);
    })
  }

  logout()
  {
   this.accountservice.logout();
   this.router.navigateByUrl('/');
  }

  

}

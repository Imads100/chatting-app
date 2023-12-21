import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { User } from '../Models/user';
import { ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
    baseUrl = 'https://localhost:7097/api/';
    
    private currentUserSource = new ReplaySubject<User>(1);

    currentUser$ = this.currentUserSource.asObservable();


  constructor(private http: HttpClient) { }


login(model:any)
{
return this.http.post(this.baseUrl + 'Account/Login',model).pipe(map((response:User)=>
{
  const user = response;
  if(user) {
    localStorage.setItem('user',JSON.stringify(user));
    this.currentUserSource.next(user);
  }
}) );
}

is_login(){
  if(localStorage.getItem('user'))
return true;
else 
return false;
}

register(model:User)
{
return this.http.post(this.baseUrl+'Account/register',model).pipe(map((respons:User)=>
{
  const user = respons; 
  if(user)
{
  localStorage.setItem('user',JSON.stringify(user));
  this.currentUserSource.next(user);
}
}
));
}


setCurrenyUser(user:User)
{
 this.currentUserSource.next(user);
}


logout()
{
localStorage.removeItem('user');
this.currentUserSource.next(null);
}

}

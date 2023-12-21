import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.css']
})
export class TestErrorsComponent {
baseUrl = 'https://localhost:7097/api/';
validationErrors: string[] = [];
constructor(private htpp: HttpClient){}


get404Error(){
  this.htpp.get(this.baseUrl+'Buggy/not-found').subscribe(response=> {
  console.log(response);
  }, error=>{
    console.log(error);
  })
}

get400Error(){
  this.htpp.get(this.baseUrl+'Buggy/bad-request').subscribe(response=> {
  console.log(response);
  }, error=>{
    console.log(error);
  })
}


get500Error(){
  this.htpp.get(this.baseUrl+'Buggy/server-error').subscribe(response=> {
  console.log(response);
  }, error=>{
    console.log(error);
  })
}


get401Error(){
  this.htpp.get(this.baseUrl+'Buggy/auth').subscribe(response=> {
  console.log(response);
  }, error=>{
    console.log(error);
  })
}


get400ValidationError(){
  this.htpp.get(this.baseUrl+'Buggy/not-found').subscribe(response=> {
  console.log(response);
  }, error=>{
    console.log(error);

    this.validationErrors = error;
  })
}



}

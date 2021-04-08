import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  userName: string;
  emailAddress: string;
  password: string;
  zip: string;

  handleCreateUserSubmit(): void {

    const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtYXJjLndyaWdodEBnbWFpbC5jb20iLCJleHAiOjE2MTc5Mzg4NzIsImlhdCI6MTYxNzkwMjg3Mn0.zr-9mSxZPNwuksYnwiMVjoCAasbmLxd_gB1PehnXxkY";
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type':  'application/json',
    //     'Access-Control-Allow-Origin': '*',
    //     'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
    //     'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
    //     // Authorization: 'my-auth-token'
    //   })
    // };

    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type':  'application/json',
    //     'Access-Control-Allow-Origin': '*',
    //     'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
    //     'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
    //     Authorization: token
    //   })
    // };

    const newUser = {userName: this.userName, emailAddress: this.emailAddress, password: this.password};
    console.log(newUser);
    this.http
      .post(`https://fathomless-falls-90499.herokuapp.com/auth/users/register`, newUser)
      .toPromise()
      .then(response => console.log(JSON.stringify(response)));

    // const newUser = {userName: this.userName, emailAddress: this.emailAddress, password: this.password};
    // console.log(newUser);
    // this.http
    //   .get(`https://floating-beyond-06948.herokuapp.com/api/categories`, httpOptions)
    //   .toPromise()
    //   .then(response => console.log(JSON.stringify(response)));
  }


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

}

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
  token: string;
  currentUser: {};

  handleUserRegister(): void {
    const newUser = {userName: this.userName, emailAddress: this.emailAddress, password: this.password};
    console.log(newUser);
    this.http
      .post(`https://fathomless-falls-90499.herokuapp.com/auth/users/register`, newUser)
      .toPromise()
      .then(response => console.log(response));
  }

  handleUserLogin(): void {
    const user = {email: this.emailAddress, password: this.password};
    console.log(user);
    this.http
      // BACKEND WITH CORS
      .post(`https://fathomless-falls-90499.herokuapp.com/auth/users/login`, user)
      .toPromise()
      .then(response => {
        this.token = response['jwt'];
        console.log(response, this.token);
      });
  }

  getCategories(): void {
    const headerDict = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtYXJjLndyaWdodEBnbWFpbC5jb20iLCJleHAiOjE2MTc5NTUyNTEsImlhdCI6MTYxNzkxOTI1MX0.HrbJz7pcpHf_XkGObkr24baVVuV2NYinhjjlAawvlCc`
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    // const headersObject = new HttpHeaders()
    //   .set('content-type', 'application/json')
    //   .set('Authorization', `Bearer ${this.token}`);
    console.log(headerDict, requestOptions);
    this.http
      // NON CORS BACKEND
      .get(`https://floating-beyond-06948.herokuapp.com/api/categories`, requestOptions)
      .toPromise()
      .then(response => {

        console.log(response);
      });
  }


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

}

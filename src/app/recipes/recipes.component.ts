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
      .post(`https://fathomless-falls-90499.herokuapp.com/auth/users/login`, user)
      .toPromise()
      .then(response => {
        this.token = response['jwt'];
        console.log(response, this.token);
      });
  }


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

}

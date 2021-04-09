import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

const herokuUrl = 'https://fathomless-falls-90499.herokuapp.com'; // WITH CORS
// const herokuUrl = "https://floating-beyond-06948.herokuapp.com"; // NO CORS

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  userName: string;
  emailAddress: string;
  password: string;
  name: string;
  description: string;
  token: string;
  currentUser: {};
  categories: any;

  handleUserRegister(): void {
    const newUser = {userName: this.userName, emailAddress: this.emailAddress, password: this.password};
    console.log(newUser);
    this.http
      .post(`${herokuUrl}/auth/users/register`, newUser)
      .toPromise()
      .then(response => console.log(response));
  }

  handleUserLogin(): void {
    const user = {email: this.emailAddress, password: this.password};
    console.log(user);
    this.http
      // BACKEND WITH CORS
      .post(`${herokuUrl}/auth/users/login`, user)
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
      Authorization: `Bearer ${this.token}`
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    console.log(headerDict, requestOptions);
    this.http
      // NON CORS BACKEND
      .get(`${herokuUrl}/api/categories`, requestOptions)
      .toPromise()
      .then(response => {
        this.categories = response;
        console.log(response);
      });
  }

  createCategory(): void {
    const headerDict = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      Authorization: `Bearer ${this.token}`
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    const category = {name: this.name, description: this.description};

    console.log(headerDict, requestOptions, category);
    this.http
      // NON CORS BACKEND
      .post(`${herokuUrl}/api/categories/`, category, requestOptions)
      .toPromise()
      .then(response => { console.log(response); });
  }

  deleteCategory(categoryId): void {
    const headerDict = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      Authorization: `Bearer ${this.token}`
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    this.http
      // NON CORS BACKEND
      .delete(`${herokuUrl}/api/categories/${categoryId}`,  requestOptions)
      .toPromise()
      .then(response => {
        console.log(response);

      });
  }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

}

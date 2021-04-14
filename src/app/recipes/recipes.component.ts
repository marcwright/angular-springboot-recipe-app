import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

const herokuUrl = 'https://damp-bayou-38809.herokuapp.com'; //with http.cors()
// const herokuUrl = 'https://fathomless-falls-90499.herokuapp.com'; // WITH CORS
// const herokuUrl = "https://floating-beyond-06948.herokuapp.com"; // NO CORS
// const herokuUrl = 'http://localhost:8080';

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
  recipeName: string;

  createRecipe(category): void {
    const requestOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      }),
    };
    const newRecipe = {name: this.recipeName};
    this.http
      .post(`${herokuUrl}/api/categories/${category.id}/recipes/`, newRecipe, requestOptions)
      .toPromise()
      .then(response => {
        console.log(response);
        // const categoryIndex = this.categories.indexOf(category);
        // const categoryToUpdate = this.categories[categoryIndex];
        // categoryToUpdate.recipeList.push(response);
        // console.log("cat to update", categoryToUpdate);
        // // this.categories = [...this.categories, categoryToUpdate];
        // this.categories[categoryIndex] = categoryToUpdate;

        this.categories[this.categories.indexOf(category)].recipeList.push(response);
      });
  }

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
      .post(`${herokuUrl}/auth/users/login`, user)
      .toPromise()
      .then(response => {
        this.token = response['jwt'];
        localStorage.setItem("currentUser", `${this.emailAddress}`);
        localStorage.setItem("token", `${this.token}`);
        console.log(response, this.token);
      })
      .then(() => {
        this.getCategories();
      });
  }

  getCategories(): void {
    const requestOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      }),
    };
    this.http
      .get(`${herokuUrl}/api/categories`, requestOptions)
      .toPromise()
      .then(response => {
        this.categories = response;
        console.log(response);
      });
  }

  createCategory(): void {
    const requestOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      }),
    };
    const category = {name: this.name, description: this.description};
    this.http
      .post(`${herokuUrl}/api/categories/`, category, requestOptions)
      .toPromise()
      .then(response => {
        console.log(response);
        this.categories = [...this.categories, response];
      });
  }

  deleteCategory(category): void {
    const requestOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      }),
    };

    this.http
      .delete(`${herokuUrl}/api/categories/${category.id}`, requestOptions)
      .toPromise()
      .then(response => {
        console.log(response);
        const categoriesCopy = [...this.categories];
        categoriesCopy.splice(this.categories.indexOf(category), 1);
        this.categories = [...categoriesCopy];
      });
  }

  logout(): void {
    this.token = '';
    this.categories = null;
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    console.log(localStorage);
  }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const localToken = localStorage.getItem("token");
    const currentUser = localStorage.getItem("currentUser");
    if (localToken) { this.token = localToken; this.emailAddress = currentUser;  }
  }

}

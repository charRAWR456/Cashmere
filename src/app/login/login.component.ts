import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Routing } from '../app.routing';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string;
  password: string;
  errorMsg: "Sorry, but the credentials you provided are incorrect. Please try again.";

  constructor(private authService: AuthenticationService, private router: Router) { }

  login() {
    this.authService.login({ email: this.email, password: this.password})
      .then(resolve => this.router.navigate(['grid']))
      .catch(error => error.message
    );
  }
}

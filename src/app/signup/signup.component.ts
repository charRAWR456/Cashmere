import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Routing } from '../app.routing';
import { Router } from '@angular/router';
import { AngularFireAuthModule } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { environment } from '../../environments/environment';

@Component({
  selector: 'signup-app',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  signupEmail : string;
  signupPassword: string;

  constructor(private router: Router) { }

  signup() {
    firebase.auth().createUserWithEmailAndPassword(this.signupEmail, this.signupPassword)
      .then(resolve => this.router.navigate(['login']))
      .catch(error => error.message
    );
  }
}

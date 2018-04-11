import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Routing } from '../app.routing';
import { Router } from '@angular/router';
import { AngularFireAuthModule } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  displayName: string;
  photoURL: string;

  constructor(private router: Router) {
  }

  updateProfile(){

    let user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: this.displayName,
      photoURL: this.photoURL

    }).then(function() {

      console.log("Update successful")

    }).catch(function(error){
      console.log(error)
    });
  }

  getProfileInfo(){
    let user = firebase.auth().currentUser;
    let profileName;
    let profilePic;

    if(user != null) {
      profileName = user.displayName;
      profilePic = user.photoURL;

      console.log(profileName);
      console.log(profilePic);
      }
    }
  }

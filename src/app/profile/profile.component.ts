import { Component, OnInit } from '@angular/core';
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
export class ProfileComponent implements OnInit {

  displayName: string;
  photoURL: string;
  profileName: string;
  profilePic: string;

  constructor(private router: Router) {
  }

  updateProfile(){

    let user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: this.displayName,
      photoURL: this.photoURL

    }).then(function() {
      
    }).catch(function(error){
      console.log(error)
    });
  }

  getProfileInfo(){
    let user = firebase.auth().currentUser;
    console.log(user);

    if(user != null) {
      this.profileName = user.displayName;
      this.profilePic = user.photoURL;

      console.log(this.profileName);
      console.log(this.profilePic);
      }
    }

    ngOnInit() {
      setTimeout(()=>{this.getProfileInfo()}, 1000);

      }
    }

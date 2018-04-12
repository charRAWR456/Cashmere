import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Routing } from '../app.routing';
import { Router } from '@angular/router';
import { AngularFireAuthModule } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { environment } from '../../environments/environment';
import { ScoreService } from '../services/score.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userScore: any;
  displayName: string;
  photoURL: string;
  profileName: string;
  profilePic: string;

  edit: boolean=false;

  user = firebase.auth().currentUser;

  constructor(private router: Router, private scoreService: ScoreService) {
  }

  clickedEdit(){
    this.edit=true;
  }

  updateProfile(){


    this.user.updateProfile({
      displayName: this.displayName,
      photoURL: this.photoURL

    }).then(function() {
      window.location.reload()
    }).catch(function(error){
      console.log(error)
    });
    this.edit=false;
  }

  getProfileInfo(){
    console.log(this.user);

    if(this.user != null) {
      this.profileName = this.user.displayName;
      this.profilePic = this.user.photoURL;

      console.log(this.profileName);
      console.log(this.profilePic);
      }
    }

    ngOnInit() {
      firebase.auth().currentUser;
      setTimeout(()=>{this.getProfileInfo()}, 1000);
      setTimeout(()=>{this.userScore = this.scoreService.getHighScore(this.user.uid)}, 1000);

      }
    }

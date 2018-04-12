import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { environment } from '../../environments/environment';

export class Score {
  body: number;
}

@Injectable()
export class ScoreService {

  score: FirebaseListObservable<any[]>;
  userId: string;

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user =>{
      if(user) this.userId = user.uid;
      this.score = db.list('score');
      console.log('Value:' + this.score[1]);
    })
  }

  getHighScore(key: string) {
    return firebase.database().ref('score/' + key).once('value')
    .then((snap) => snap.val());
  }

  // getHighScore(): FirebaseListObservable<any[]>{
  //   let user = firebase.auth().currentUser;
  //   this.userId = user.uid;
  //   console.log('value:' + this.score[0]);
  //   if (!this.userId) return;
  //   this.score = this.db.list(`score/${this.userId}/MyScore`);
  //   console.log("my score" + this.score[1]);
  //   return this.score;
  // }



  // createScore(userScore: number){
  //   let user = firebase.auth().currentUser;
  //   this.score.push({
  //     'myScore': userScore,
  //     'myId': this.userId
  //   })
  // }

}

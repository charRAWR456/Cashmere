import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

export class Score {
  body: number;
}

@Injectable()
export class ScoreService {

  score: FirebaseListObservable<any>;
  userId: string;

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user =>{
      if(user) this.userId = user.uid
    })
  }

  getHighScore(): FirebaseListObservable<Number[]>{
    if (!this.userId) return;
    this.score = this.db.list(`score/${this.userId}`);
  }

  createScore(score: Score){
    this.score.push(score)
  }

}

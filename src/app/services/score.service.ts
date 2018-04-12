import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class ScoreService {

  score: FirebaseListObservable<any>;
  players: FirebaseListObservable<any>;
  currentPlayer: FirebaseObjectObservable<any>;

  constructor(private db: AngularFireDatabase) {
    this.score = this.db.list('score');
  }

  createPlayer(userId: string, username: string){
    let newPlayer = {
      uid: userId,
      score: 0,
    }
    this.players.push(newPlayer)
    .then(snap=>{
      this.currentPlayer = this.db.object('players/' + snap.key);
    })
  }

}

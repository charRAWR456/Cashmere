import { Component, HostListener, Input, Output } from '@angular/core';
import { grid } from '../models/grid.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})

export class GridComponent {
  gameGrid = new grid();
  showDialog = false;
  showWin = false;

  constructor() {
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event) {
    let playerPosition = this.gameGrid.findPlayer();
    this.gameGrid.counter += 1;
    this.playerGrade();

    if (event.key === "ArrowLeft" && playerPosition.y !== 0 && this.gameGrid.board[(playerPosition.x)][playerPosition.y-1].walkable) {
      this.gameGrid.board[(playerPosition.x)][playerPosition.y-1].player = true;
      playerPosition.player = false;
      this.gameGrid.board[(playerPosition.x)][playerPosition.y-1].direction = "left";
    }
    if (event.key === "ArrowRight" && playerPosition.y !== 9 && (this.gameGrid.board[(playerPosition.x)][playerPosition.y+1]).walkable) {
      this.gameGrid.board[(playerPosition.x)][playerPosition.y+1].player = true;
      playerPosition.player = false;
      this.gameGrid.board[(playerPosition.x)][playerPosition.y+1].direction = "right";
    }

    if (event.key === "ArrowUp" && playerPosition.x !== 0 && this.gameGrid.board[(playerPosition.x-1)][playerPosition.y].walkable) {
      this.gameGrid.board[(playerPosition.x-1)][playerPosition.y].player = true;
      playerPosition.player = false;
      this.gameGrid.board[(playerPosition.x-1)][playerPosition.y].direction = "up";
    }
    if (event.key === "ArrowDown" && playerPosition.x !== 9 && this.gameGrid.board[(playerPosition.x+1)][playerPosition.y].walkable) {
      this.gameGrid.board[(playerPosition.x+1)][playerPosition.y].player = true;
      playerPosition.player = false;
      this.gameGrid.board[(playerPosition.x+1)][playerPosition.y].direction = "down";
    }
    //Below code is to ensure player and enemy don't switch tiles.
    if (this.gameGrid.findPlayer() === this.gameGrid.findEnemy()) {
      this.playCaught();
      this.showDialog = true;
    }
    this.gameGrid.moveEnemy();
    this.gameGrid.getEnemyDirection();
    if (this.gameGrid.isGameOver()){
      this.playCaught();
      this.showDialog = true;
    }
    if (this.gameGrid.playerWon()) {
      this.setCurrentBestScore();
      this.gameGrid.removePlayerFromGoal();
      this.playMeow();
      this.showWin = true;
    }
  }

  setMoonwalk () {
    this.gameGrid.moonwalk = !this.gameGrid.moonwalk;
    this.toggleBillieJean();
  }

  reset() {
    let persistGrade = this.gameGrid.currentBestGrade;
    let persistScore = this.gameGrid.currentBestScore;
    this.gameGrid = new grid();
    this.gameGrid.currentBestGrade = persistGrade;
    this.gameGrid.currentBestScore = persistScore;
  }

  playerGrade(){
    if (this.gameGrid.counter > 40) {
      this.gameGrid.studentGrade = "F";
    } else if (this.gameGrid.counter > 37) {
      this.gameGrid.studentGrade = "D";
    } else if (this.gameGrid.counter > 36) {
      this.gameGrid.studentGrade = "C";
    } else if (this.gameGrid.counter > 35) {
      this.gameGrid.studentGrade = "B";
    } else if (this.gameGrid.counter > 34) {
        this.gameGrid.studentGrade = "A";
    } else if (this.gameGrid.counter <= 34) {
      this.gameGrid.studentGrade = "A+++";
    }
    return this.gameGrid.studentGrade;
    }
  setCurrentBestScore() {
      if (this.gameGrid.counter < this.gameGrid.currentBestScore) {
        this.gameGrid.currentBestScore = this.gameGrid.counter;
      }
      if (this.gameGrid.currentBestScore > 40) {
        this.gameGrid.currentBestGrade = "F";
      } else if (this.gameGrid.currentBestScore > 37) {
        this.gameGrid.currentBestGrade = "D";
      } else if (this.gameGrid.currentBestScore > 36) {
        this.gameGrid.currentBestGrade = "C";
      } else if (this.gameGrid.currentBestScore > 35) {
        this.gameGrid.currentBestGrade = "B";
      } else if (this.gameGrid.currentBestScore > 34) {
          this.gameGrid.currentBestGrade = "A";
      } else if (this.gameGrid.currentBestScore <= 34) {
        this.gameGrid.currentBestGrade = "A+++";
      }
  }

  toggleBillieJean(){
    let Jean = new Audio('../../assets/SFX/Jean.mp3');
    if (this.gameGrid.moonwalk) {
      Jean.load();
      Jean.play();
    }
    if (this.gameGrid.moonwalk === false){
      console.log("not my lover");
      Jean.pause();
    }
  }

  playMeow(){
    let meow = new Audio('../../assets/SFX/meow.mp3');
    meow.load();
    meow.play();
  }

  playCaught(){
    let caught = new Audio('../../assets/SFX/Damage.mp3');
    caught.load();
    caught.play();
  }

  renderSprite (tile){
    let styles = {};
    if (this.gameGrid.moonwalk === true && tile.direction === "right") {
      tile.direction = "left";
    } else if (this.gameGrid.moonwalk === true && tile.direction === "left") {
      tile.direction = "right";
    }
    if (this.gameGrid.moonwalk === true && tile.direction === "up") {
      tile.direction = "down";
    } else if (this.gameGrid.moonwalk === true && tile.direction === "down") {
      tile.direction = "up";
    }
    if (tile.player && tile.direction === "down") {
      styles['background-image'] = 'url(../../assets/image/student.png)';
      styles['background-size'] = '1152px 780px';
      styles['background-position'] = '576px 0px';
    }
    if (tile.player && tile.direction === "up") {
      styles['background-image'] = 'url(../../assets/image/student.png)';
      styles['background-size'] = '1152px 780px';
      styles['background-position'] = '576px -292.8px';
    }
    if (tile.player && tile.direction === "right") {

      styles['background-image'] = 'url(../../assets/image/student.png)';
      styles['background-size'] = '1152px 780px';
      styles['background-position'] = '576px -195px';
    }
    if (tile.player && tile.direction === "left") {
      styles['background-image'] = 'url(../../assets/image/student.png)';
      styles['background-size'] = '1152px 785px';
      styles['background-position'] = '576px -98.7px';
    }
    if (!tile.walkable) {
      styles['background-image'] = 'url(../../assets/image/computer.png)'
      styles['background-size'] = '100% 100%';
    }
    if (tile.goal){
      styles['background-image'] = 'url(../../assets/image/image1.png)'
      styles['background-size'] = '100% 100%';
    }
    if (this.gameGrid.moonwalk === true && tile.enemyDirection === "right") {
      tile.enemyDirection = "left";
    } else if (this.gameGrid.moonwalk === true && tile.enemyDirection === "left") {
      tile.enemyDirection = "right";
    }
      if (this.gameGrid.moonwalk === true && tile.enemyDirection === "up") {
        tile.enemyDirection = "down";
      } else if (this.gameGrid.moonwalk === true && tile.enemyDirection === "down") {
        tile.enemyDirection = "up";
    }
    if (tile.enemy && tile.enemyDirection === "down") {
      styles['background-image'] = 'url(../../assets/image/teacher.png)';
      styles['background-size'] = '1152px 768px';
      styles['background-position'] = '672px 384px';
    }
    if (tile.enemy && tile.enemyDirection === "up") {
      styles['background-image'] = 'url(../../assets/image/teacher.png)';
      styles['background-size'] = '1152px 790px';
      styles['background-position'] = '672px 98px';
    }
    if (tile.enemy && tile.enemyDirection === "right") {
      styles['background-image'] = 'url(../../assets/image/teacher.png)';
      styles['background-size'] = '1152px 780px';
      styles['background-position'] = '672px 195px';
    }
    if (tile.enemy && tile.enemyDirection === "left") {
      styles['background-image'] = 'url(../../assets/image/teacher.png)';
      styles['background-size'] = '1152px 780px';
      styles['background-position'] = '672px 292.5px';
    }
    return styles;
  }
}

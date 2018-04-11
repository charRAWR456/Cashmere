import { Component, HostListener } from '@angular/core';
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
    console.log(this.gameGrid);
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event) {
    let playerPosition = this.gameGrid.findPlayer();
    this.gameGrid.counter += 1;

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
    this.gameGrid.moveEnemy();
    this.gameGrid.getEnemyDirection();
    if (this.gameGrid.isGameOver()){
      this.playCaught();
      this.showDialog = true;
    }
    if (this.gameGrid.playerWon()) {
      this.playMeow();
      this.showWin = true;
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

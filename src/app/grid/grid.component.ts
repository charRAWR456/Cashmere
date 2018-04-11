import { Component, HostListener } from '@angular/core';
import { grid } from '../models/grid.model';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})

export class GridComponent {
  gameGrid = new grid();

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
    if (this.gameGrid.isGameOver()){
      alert("player hit the enemy");
    }
    if (this.gameGrid.playerWon()) {
      alert("player reached the goal");
    }
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
    if (tile.enemy) {
      styles['background-image'] = 'url(../../assets/image/teacher.png)';
      styles['background-size'] = '1152px 768px';
      styles['background-position'] = '672px 384px';
    }
    return styles;
  }
}

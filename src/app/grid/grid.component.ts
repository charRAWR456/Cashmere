import { Component } from '@angular/core';
import { Component, HostListener } from '@angular/core';
import { grid } from '../models/grid.model'

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})

export class GridComponent {
  testGrid = new grid();
  gameGrid = new grid();

  constructor() {
    console.log(this.testGrid);
  }
  @HostListener('document:keydown', ['$event'])
  onKeydown(event) {
    let playerPosition = this.gameGrid.findPlayer();

    if (event.key === "ArrowLeft" && playerPosition.y !== 0) {
      this.gameGrid.board[(playerPosition.x)][playerPosition.y-1].player = true;
      playerPosition.player = false;
    }

    if (event.key === "ArrowRight" && playerPosition.y !== 9) {
      this.gameGrid.board[(playerPosition.x)][playerPosition.y+1].player = true;
      playerPosition.player = false;
    }

    if (event.key === "ArrowUp" && playerPosition.x !== 0) {
      this.gameGrid.board[(playerPosition.x-1)][playerPosition.y].player = true;
      playerPosition.player = false;
    }

    if (event.key === "ArrowDown" && playerPosition.x !== 9) {
      this.gameGrid.board[(playerPosition.x+1)][playerPosition.y].player = true;
      playerPosition.player = false;
    }

  }

}

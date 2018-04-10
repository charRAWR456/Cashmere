import { Tile } from './tile.model';

export class grid {
  board = [];
  height: number = 10;
  width: number = 10;

  constructor(){
    this.createBoard();
    this.setPlayerPosition();
    this.setEnemyPosition();
  }

  createBoard() {
    for (var i = 0; i < this.width; i++) {
      this.board[i] = [];
      for (var j = 0; j < this.height; j++) {
        this.board[i][j] = {
          y: j,
          x: i,
          enemy: false,
          player: false,
          walkable: true,
          spritePath: null //path for the image on this tile
        };
        this.board[i][j] = new Tile(i,j);
      }
    }
  }

  setPlayerPosition(){
    this.board[1][9].player = true;
  }
  setEnemyPosition(){
    this.board[1][8].enemy = true;
  }


  findPlayer() {
    for (let i = 0; i<10; i++) {
      for (let j = 0; j<10; j++) {
        if (this.board[i][j].player === true) {
          return this.board[i][j];
        }
      }
    }

  }

}

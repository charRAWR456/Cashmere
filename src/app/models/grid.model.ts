import { Tile } from './tile.model';

export class grid {
  board = [];
  height: number = 10;
  width: number = 10;

  constructor(){
    this.createBoard();
    this.setPlayerPosition();
    this.setEnemyPosition();
    this.setObstacles();
    this.setGoal();
  }

  createBoard() {
    for (var i = 0; i < this.width; i++) {
      this.board[i] = [];
      for (var j = 0; j < this.height; j++) {
        this.board[i][j] = new Tile(i,j);
      }
    }
  }

  setPlayerPosition(){
    this.board[9][1].player = true;
  }
  setEnemyPosition(){
    this.board[9][9].enemy = true;
  }
  setObstacles(){
    this.board[5][2].walkable = false;
    this.board[3][5].walkable = false;
    this.board[9][0].walkable = false;
    this.board[2][2].walkable = false;
    this.board[3][3].walkable = false;
    this.board[4][5].walkable = false;
    this.board[8][6].walkable = false;
    this.board[3][8].walkable = false;
    this.board[1][3].walkable = false;
    this.board[9][4].walkable = false;
    this.board[7][1].walkable = false;
    this.board[7][8].walkable = false;
  }
  setGoal(){
    this.board[0][9].goal=true;
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

export class grid {
  board = [];
  height: number = 10;
  width: number = 10;

  constructor(){
    this.createBoard();
    this.setPlayerPosition();
  }

  createBoard() {
    for (var i = 0; i < this.width; i++) {
      this.board[i] = [];
      for (var j = 0; j < this.height; j++) {
        this.board[i][j] = {
          y: j,
          x: i,
          player: false,
          walkable: true,
          sprite: null //path for the image on this tile
        };
      }
    }
  }

  setPlayerPosition(){
    this.board[1][9].player = true;
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

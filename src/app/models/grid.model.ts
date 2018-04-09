export class grid {
  board = [];
  height: number = 10;
  width: number = 10;

  constructor(){
    this.createBoard();
  }

  createBoard() {
    for (var i = 0; i < this.width; i++) {
      this.board[i] = [];
      for (var j = 0; j < this.height; j++) {
        this.board[i][j] = {
          x: j,
          y: i,
          player: false,
          walkable: true,
          sprite: null //path for the image on this tile
        };
      }
    }
  }
}

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
    this.enemyRadar();
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
  findEnemy() {
    for (let i = 0; i<10; i++) {
      for (let j = 0; j<10; j++) {
        if (this.board[i][j].enemy === true) {
          return this.board[i][j];
        }
      }
    }
  }
  findTile(y:number, x:number) {
  return this.board[x][y];
  }
  enemyRadar() {
    let openList = [];
    let closedList = [];
    let currentTile = this.findEnemy();
    let target = this.findPlayer();
    closedList.push(currentTile);
    let addX = currentTile.x+1;
    let minusX = currentTile.x-1;
    // let addY = currentTile.y+1;
    // let minusY = currentTile.y-1;
    // if (addX !== 10 && addX !== 0 && minusX !== 10 && minusX !== 0 && addY !== 10 && addY !== 0 && minusY !== 10 && minusY !== 0)
     if(currentTile.x > 9 || currentTile.y > 9 || currentTile.x < 0 || currentTile.y < 0){
    let upTile = this.findTile(currentTile.x+1, currentTile.y)
    openList.push(upTile);
  }
     if(currentTile.x > 9 || currentTile.y > 9 || currentTile.x < 0 || currentTile.y < 0){
       let leftTile = this.findTile(currentTile.x, currentTile.y+1)
    openList.push(leftTile);
  }

     if(currentTile.x > 9 || currentTile.y > 9 || currentTile.x < 0 || currentTile.y < 0){
       let rightTile = this.findTile(currentTile.x, currentTile.y-1)
    openList.push(rightTile);
  }
     if(currentTile.x > 9 || currentTile.y > 9 || currentTile.x < 0 || currentTile.y < 0){
       let bottomTile = this.findTile(currentTile.x-1, currentTile.y)
    openList.push(bottomTile);
  }
    console.log(openList);
    return openList;
    }

    tileCount(height: number, width: number){
    let gridSize: number = width * height;

    return gridSize;
    }


  }

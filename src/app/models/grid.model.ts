import { Tile } from "./tile.model";

export class grid {
  board = [];
  tiles = [];
  height: number = 10;
  width: number = 10;
  counter: number = 0;
  studentGrade: string;
  currentBestScore: number = 100;
  currentBestGrade: string = "F";
  enemyLastMove: Tile;

  constructor() {
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
        const newTile = new Tile(i, j);
        this.board[i][j] = newTile;
        this.tiles.push(newTile);
      }
    }
  }
  setPlayerPosition() {
    this.board[5][0].player = true;
  }
  removePlayerFromGoal() {
    this.board[0][3].player = false;
  }
  setEnemyPosition() {
    this.board[7][7].enemy = true;
  }
  setObstacles() {
    this.board[0][0].walkable = false;
    this.board[0][1].walkable = false;
    this.board[0][2].walkable = false;
    this.board[0][4].walkable = false;
    this.board[0][8].walkable = false;
    this.board[1][4].walkable = false;
    this.board[1][6].walkable = false;
    this.board[1][8].walkable = false;
    this.board[2][1].walkable = false;
    this.board[2][2].walkable = false;
    this.board[2][3].walkable = false;
    this.board[2][4].walkable = false;
    this.board[2][6].walkable = false;
    this.board[2][8].walkable = false;
    this.board[3][6].walkable = false;
    this.board[4][0].walkable = false;
    this.board[4][1].walkable = false;
    this.board[4][2].walkable = false;
    this.board[4][3].walkable = false;
    this.board[4][4].walkable = false;
    // this.board[4][5].walkable = false;
    this.board[4][6].walkable = false;
    this.board[4][7].walkable = false;
    this.board[4][8].walkable = false;
    this.board[5][3].walkable = false;
    this.board[6][0].walkable = false;
    this.board[6][1].walkable = false;
    this.board[6][3].walkable = false;
    this.board[6][5].walkable = false;
    this.board[6][6].walkable = false;
    this.board[6][7].walkable = false;
    this.board[6][8].walkable = false;
    // this.board[6][9].walkable = false;
    // this.board[7][3].walkable = false;
    this.board[7][5].walkable = false;
    this.board[8][1].walkable = false;
    this.board[8][2].walkable = false;
    this.board[8][3].walkable = false;
    this.board[8][5].walkable = false;
    this.board[8][6].walkable = false;
    this.board[8][7].walkable = false;
    this.board[8][8].walkable = false;

  }
  setGoal() {
    this.board[0][3].goal = true;
  }

  findPlayer() {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (this.board[i][j].player === true) {
          return this.board[i][j];
        }
      }
    }
  }
  findEnemy() {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (this.board[i][j].enemy === true) {
          return this.board[i][j];
        }
      }
    }
  }
  findGoal() {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (this.board[i][j].goal === true) {
          return this.board[i][j];
        }
      }
    }
  }
  findTile(x: number, y: number) {
    if (x >= 0 && y >= 0 && this.board.length > x && this.board[x].length > y) {
      return this.board[x][y];
    }
  }

  isGameOver() {
    return (this.findEnemy() == this.findPlayer() || this.studentGrade === "F");
  }

  playerWon() {
    return (this.findPlayer() == this.findGoal()); //if additional levels added w/ different goal positions, may need a findGoal() function
  }

  enemyRadar() {
    // Find Walkable positions for each of the tiles in your openList
    const heads = [];
    const enemy = this.findEnemy();
    const target = this.findPlayer();
    let found = false;
    let bestMove;
    heads.push(enemy);

    // Almost A*, Breadth First Search

    // Loops over a list of available moves called heads, looking for new moves during each loop.
    // Keeps a trail each time a new move is found, so once the enemy is found you trace the trail back to the enemy from the target.
    // The last item in the trail of previous moves is the enemy itself, so the 2nd to last move is the best move the enemy could take in order to reach its target.

    while (heads.length > 0 && !found) {
      const currentTile = heads.shift(); // Get the first item from head
      const down = this.findTile(currentTile.x, currentTile.y + 1);
      const up = this.findTile(currentTile.x, currentTile.y - 1);
      const left = this.findTile(currentTile.x - 1, currentTile.y);
      const right = this.findTile(currentTile.x + 1, currentTile.y);

      // Check each of the 4 directions to see if it exists, can be walked on, and if it has previously been searched
      if (up && up.walkable && !up.searched) {
        heads.push(up);
        up.previous = currentTile;
      }
      if (down && down.walkable && !down.searched) {
        heads.push(down);
        down.previous = currentTile;
      }
      if (left && left.walkable && !left.searched) {
        heads.push(left);
        left.previous = currentTile;
      }
      if (right && right.walkable && !right.searched) {
        heads.push(right);
        right.previous = currentTile;
      }

      // Set the searched tiles to searched
      if (up) up.searched = true;
      if (down) down.searched = true;
      if (left) left.searched = true;
      if (right) right.searched = true;


      // Check if any of the searched tiles is the player.
      // If it is, set a flag to exit the while loop.
      if (
        (up && up.player) ||
        (left && left.player) ||
        (down && down.player) ||
        (right && right.player)
      ) {
        found = true;
      }
    }

    // Since the player has been found, you can just loop backwards from the player and you will trace the path back to your enemy.
    if (found == true) {
      let player = target;
      while (player.previous && !player.previous.enemy) {
        player = player.previous;
      }
      bestMove = player;
    }

    // Reset all the things I set on the tiles while searching so that it is clear to do another search next time.
    this.tiles.forEach(tile => {
      tile.searched = false;
      tile.previous = null;
    });

    // console.log("move", bestMove);
    // Return the best move
    return bestMove;
  }

  moveEnemy() {
    // Get the best new position
    this.enemyLastMove = this.findEnemy();

    const bestMove = this.enemyRadar();
    // Get the current position
    const enemy = this.findEnemy();
    // Set the new enemy position
    bestMove.enemy = true;
    // Clear the old enemy position
    enemy.enemy = false;
  }

  tileCount(height: number, width: number) {
    let gridSize: number = width * height;

    return gridSize;
  }

  getEnemyDirection() {
    let enemyTile = this.findEnemy();
    if (this.enemyLastMove.y > enemyTile.y) {
      enemyTile.enemyDirection = "left";
    } else if (this.enemyLastMove.y < enemyTile.y) {
      enemyTile.enemyDirection = "right";
    } else if (this.enemyLastMove.x > enemyTile.x) {
      enemyTile.enemyDirection = "up";
    } else if (this.enemyLastMove.x < enemyTile.x) {
      enemyTile.enemyDirection = "down";
    }
  }
}

export class Tile {

  constructor(
    public x:number,
    public y:number,
    public player:boolean=false,
    public enemy: boolean=false,
    public goal:boolean=false,
    public walkable:boolean=true,
    public spritePath:string=null,
    public direction:string="down",
    public enemyDirection:string="down"
  ){}
}

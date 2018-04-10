import { Component, OnInit } from '@angular/core';
import { grid } from '../models/grid.model';

@Component({
  selector: 'app-enemy',
  templateUrl: './enemy.component.html',
  styleUrls: ['./enemy.component.css']
})
export class EnemyComponent implements OnInit {


  constructor() { }

  ngOnInit() {
  }

  renderEnemy (tile){
    let styles = {};
    if (tile.enemy) {
      styles['background-image'] = 'url(../../assets/image/dot.svg)';
      // styles['background-size'] = '1000px 1000px';
      // styles['background-position'] = '';
    }
    return styles;
  }

}

import { Component } from '@angular/core';
import { grid } from '../models/grid.model'

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})

export class GridComponent {
  testGrid = new grid();

  constructor() {
    console.log(this.testGrid);
  }

}

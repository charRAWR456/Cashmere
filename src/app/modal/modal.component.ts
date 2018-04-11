import {
  Component, OnInit, Input, Output, OnChanges, EventEmitter,
  trigger, state, style, animate, transition } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ]
})
export class ModalComponent implements OnInit {
    @Input() closable = true;
    @Input() visible: boolean;
    @Input() reset: boolean;
    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() resetGrid: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {
  }
  close() {
      this.visible = false;
      this.reset = true;
      this.visibleChange.emit(this.visible);
      this.resetGrid.emit(this.reset);
    }
}

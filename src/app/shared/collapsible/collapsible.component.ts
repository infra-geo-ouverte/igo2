import { Component, Input, Output, ViewChild, EventEmitter } from '@angular/core';

import { FlexibleState, FlexibleComponent } from '../flexible';

@Component({
  selector: 'igo-collapsible',
  templateUrl: './collapsible.component.html',
  styleUrls: ['./collapsible.component.styl']
})
export class CollapsibleComponent {

  @ViewChild('content') content: FlexibleComponent;

  @Input() state: FlexibleState = 'expanded';
  @Input() title: string;

  @Output() collapse: EventEmitter<any> = new EventEmitter();
  @Output() expand: EventEmitter<any> = new EventEmitter();

  constructor() { }

  handleClick() {
    if (this.state !== 'collapsed') {
      this.state = 'collapsed';
      this.collapse.emit();
    } else {
      this.state = 'expanded';
      this.expand.emit();
    }
  }

}

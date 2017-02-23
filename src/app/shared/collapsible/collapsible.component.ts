import { Component, Input, ViewChild } from '@angular/core';

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

  constructor() { }

  handleClick() {
    if (this.state !== 'collapsed') {
      this.state = 'collapsed';
    } else {
      this.state = 'expanded';
    }
  }

}

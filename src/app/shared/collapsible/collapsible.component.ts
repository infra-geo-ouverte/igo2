import { Component, Input, ViewChild } from '@angular/core';

import { FlexState, FlexComponent } from '../flex';

@Component({
  selector: 'igo-collapsible',
  templateUrl: './collapsible.component.html',
  styleUrls: ['./collapsible.component.styl']
})
export class CollapsibleComponent {

  @ViewChild('content') content: FlexComponent;

  @Input() state: FlexState = 'expanded';
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

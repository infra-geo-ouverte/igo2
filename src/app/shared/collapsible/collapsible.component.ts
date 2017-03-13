import { Component, Input } from '@angular/core';

@Component({
  selector: 'igo-collapsible',
  templateUrl: './collapsible.component.html',
  styleUrls: ['./collapsible.component.styl']
})
export class CollapsibleComponent {

  @Input() title: string;
  @Input() collapsed: boolean = false;

  constructor() { }

}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'igo-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.styl']
})
export class PanelComponent {

  @Input() title: string;

  constructor() { }

}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'igo-backdrop',
  templateUrl: './backdrop.component.html',
  styleUrls: ['./backdrop.component.styl']
})
export class BackdropComponent {
  @Input() shown: boolean = false;

  constructor() { }

}

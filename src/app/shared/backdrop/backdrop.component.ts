import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-backdrop',
  templateUrl: './backdrop.component.html',
  styleUrls: ['./backdrop.component.styl']
})
export class BackdropComponent {

  @Input()
  get shown(): boolean { return this._shown; }
  set shown(value: boolean) {
    this._shown = value;
  }
  private _shown: boolean;

  constructor() { }

}

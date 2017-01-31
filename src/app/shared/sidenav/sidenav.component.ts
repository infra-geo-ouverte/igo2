import { Component, Input } from '@angular/core';

@Component({
  selector: 'igo-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.styl']
})
export class SidenavComponent {

  @Input() opened: boolean = false;

  constructor() { }

  close() {
    this.opened = false;
  }

  open() {
    this.opened = true;
  }

  toggle() {
    if (this.opened) {
      this.close();
    } else {
      this.open();
    }
  }

}

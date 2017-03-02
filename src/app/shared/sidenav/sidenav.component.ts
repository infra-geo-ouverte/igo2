import { Component, Input, Renderer } from '@angular/core';

@Component({
  selector: 'igo-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.styl']
})
export class SidenavComponent {

  @Input() opened: boolean = false;

  private focusedElement: HTMLElement;
  private blurElement: HTMLElement;

  onOpen() {
    this.focusedElement = document.activeElement as HTMLElement;
  };

  onCloseStart() {
    const focusedElement = document.activeElement as HTMLElement;
    if (focusedElement !== this.focusedElement) {
      this.blurElement = this.focusedElement;
    } else {
      this.blurElement = undefined;
    }
  };

  // This is to prevent the sidenav from focusing
  // the element that was focused before it was opened
  onClose() {
    if (this.blurElement) {
      this.renderer.invokeElementMethod(this.blurElement, 'blur');
    }

    this.blurElement = undefined;
    this.focusedElement = undefined;
  };

  constructor(private renderer: Renderer) { }
}

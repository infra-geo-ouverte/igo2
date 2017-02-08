import { Directive, Output, ElementRef, Renderer, HostListener, EventEmitter } from '@angular/core';

@Directive({
  selector: '[igoListItem]',

})
export class ListItemDirective {

  static cls: string = 'igo-selected';

  @Output() onClick: EventEmitter<ListItemDirective> = new EventEmitter();
  @Output() onSelect: EventEmitter<ListItemDirective> = new EventEmitter();
  @Output() onUnselect: EventEmitter<ListItemDirective> = new EventEmitter();

  @HostListener('click') click() {
    this.onClick.emit(this);
  }

  constructor(public renderer: Renderer, private el: ElementRef) { }

  select() {
    this.renderer.setElementClass(
      this.el.nativeElement, ListItemDirective.cls, true);

    // Get a reference to the active element
    const activeElement = window.document.activeElement;

    // Focus on the selected element. This will make
    // any scrollbar scroll to that element when using the
    // arrows for navigation
    this.renderer.invokeElementMethod(this.el.nativeElement, 'focus', []);

    // Refocus on the previously selected element, if it's
    // not anothe list item, otherwise, the scrolling might
    // not behave as expected.
    if (!activeElement.hasAttribute('igolistitem')) {
      this.renderer.invokeElementMethod(activeElement, 'focus', []);
    }

    this.onSelect.emit();
  }

  unselect() {
    this.renderer.setElementClass(
      this.el.nativeElement, ListItemDirective.cls, false);
    this.onUnselect.emit();
  }
}

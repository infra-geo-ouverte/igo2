import { Directive, Input, Output, ElementRef,
         Renderer, HostListener, EventEmitter } from '@angular/core';

@Directive({
  selector: '[igoListItem]'
})
export class ListItemDirective {

  static cls: string = 'igo-selected';

  @Input() focused: boolean = false;
  @Input() selected: boolean = false;

  @Output()
  clickItem: EventEmitter<ListItemDirective> = new EventEmitter();

  @Output()
  focusItem: EventEmitter<ListItemDirective> = new EventEmitter();

  @Output()
  unfocusItem: EventEmitter<ListItemDirective> = new EventEmitter();

  @Output()
  selectItem: EventEmitter<ListItemDirective> = new EventEmitter();

  @Output()
  unselectItem: EventEmitter<ListItemDirective> = new EventEmitter();

  @HostListener('click') click() {
    this.clickItem.emit(this);
  }

  constructor(public renderer: Renderer, private el: ElementRef) { }

  focus() {
    this.focused = true;

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

    this.focusItem.emit();
  }

  unfocus() {
    this.focused = false;

    this.renderer.setElementClass(
      this.el.nativeElement, ListItemDirective.cls, false);
    this.unfocusItem.emit();
  }

  select() {
    this.selected = true;

    this.focus();
    this.selectItem.emit();
  }

  unselect() {
    this.selected = false;

    this.unfocus();
    this.unselectItem.emit();
  }
}

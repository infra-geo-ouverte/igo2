import { Directive, Input, Output, ElementRef,
         Renderer, HostListener, EventEmitter } from '@angular/core';

@Directive({
  selector: '[igoListItem]',

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

  getOffsetTop(): number {
    const padding = 5;

    return this.el.nativeElement.offsetTop - padding;
  }
}

import { Directive, Input, Output, EventEmitter,
         HostListener, ElementRef, Renderer } from '@angular/core';


@Directive({
  selector: '[igoCollapse]'
})
export class CollapseDirective {

  @Input() target: Element;

  @Input()
  set collapsed(collapsed: boolean) {
    collapsed ? this.collapseTarget() : this.expandTarget();
    this._collapsed = collapsed;
    this.toggle.emit(collapsed);
  };

  get collapsed(): boolean {
    return this._collapsed;
  }

  private _collapsed: boolean = false;

  @Output() toggle: EventEmitter<boolean> = new EventEmitter();

  @HostListener('click') click() {
    this.collapsed = !this.collapsed;
  }

  constructor(private renderer: Renderer, private el: ElementRef) { }

  private collapseTarget() {
    this.renderer.setElementClass(this.target, 'igo-collapsed', true);
    this.renderer.setElementClass(this.el.nativeElement, 'collapsed', true);
  }

  private expandTarget() {
    this.renderer.setElementClass(this.target, 'igo-collapsed', false);
    this.renderer.setElementClass(this.el.nativeElement, 'collapsed', false);
  }

}

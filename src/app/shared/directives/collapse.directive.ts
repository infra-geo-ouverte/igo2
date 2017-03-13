import { Directive, OnInit, Input, Output, EventEmitter,
         HostListener, ElementRef, Renderer } from '@angular/core';


@Directive({
  selector: '[igoCollapse]'
})
export class CollapseDirective implements OnInit {

  @Input() target: ElementRef;

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

  ngOnInit() {
    this.renderer.setElementClass(this.el.nativeElement, 'igo-collapse', true);
  }

  private collapseTarget() {
    this.renderer.setElementStyle(this.target, 'display', 'none');
    this.renderer.setElementClass(this.el.nativeElement, 'collapsed', true);
  }

  private expandTarget() {
    this.renderer.setElementStyle(this.target, 'display', 'inline-block');
    this.renderer.setElementClass(this.el.nativeElement, 'collapsed', false);
  }

}

import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[igoFlexMain]'
})
export class FlexMainDirective {

  constructor(private el: ElementRef) { }

  setHeight(height: string) {
    this.el.nativeElement.style.height = height;
  }

  setWidth(width: string) {
    this.el.nativeElement.style.width = width;
  }

}

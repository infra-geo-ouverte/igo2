import { Directive, ElementRef, EventEmitter,
         HostListener, Output} from '@angular/core';

@Directive({
  selector: '[igoClickout]'
})
export class ClickoutDirective {

  @Output() clickout = new EventEmitter<MouseEvent>();

  @HostListener('document:click', ['$event', '$event.target'])
  handleMouseClick(event: MouseEvent, target: HTMLElement) {
    if (!target) {
      return;
    }

    if (!this.el.nativeElement.contains(target)) {
      this.clickout.emit(event);
    }
  }

  constructor(private el: ElementRef) { }

}

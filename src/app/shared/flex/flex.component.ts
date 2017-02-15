import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FlexState, FlexDirection} from "./flex";


@Component({
  selector: 'igo-flex',
  templateUrl: './flex.component.html',
  styleUrls: ['./flex.component.styl']
})
export class FlexComponent implements OnInit {

  static transitionTime = 250;

  @ViewChild('flexMain') main;

  @Input('initial') initial: string;
  @Input('collapsed') collapsed: string = '0';
  @Input('expanded') expanded: string = '100%';
  @Input('direction') direction: FlexDirection = 'column';

  private _state: FlexState = 'initial';

  get state (): FlexState {
    return this._state;
  }

  @Input('state') set state (state: FlexState){
    let size;
    switch (state) {
      case 'collapsed':
        size = this.collapsed;
        break;
      case 'expanded':
        size = this.expanded;
        break;
      case 'initial':
        size = this.initial;
        break;
      default: break;
    }

    if (size !== undefined) {
      this.setSize(size);
      setTimeout(() => {
         this._state = state;
      }, FlexComponent.transitionTime);
    }
  }

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.el.nativeElement.style.flexDirection = this.direction;
  }

  private setSize(size: string) {
    this._state = 'transition';

    if (this.direction === 'column') {
      this.main.nativeElement.style.height = size;
    } else if (this.direction === 'row') {
      this.main.nativeElement.style.width = size;
    }
  }

}

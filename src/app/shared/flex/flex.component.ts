import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

type FlexState =
  'initial'
  | 'collapsed'
  | 'expanded';

type FlexDirection =
  'column'
  | 'row';

@Component({
  selector: 'igo-flex',
  templateUrl: './flex.component.html',
  styleUrls: ['./flex.component.styl']
})
export class FlexComponent implements OnInit {

  @Input('igoFlexInitial') igoFlexInitial: string;
  @Input('igoFlexCollapsed') igoFlexCollapsed: string = '0';
  @Input('igoFlexExpanded') igoFlexExpanded: string = '100%';
  @Input('igoFlexState') igoFlexState: FlexState = 'initial';
  @Input('igoFlexDirection') igoFlexDirection: FlexDirection = 'column';

  @ViewChild('flexMain') main;

  private _state: FlexState = 'initial';

  get state (): FlexState {
    return this._state;
  }

  set state (state: FlexState){
    if (state === 'collapsed') {
      this.setSize(this.igoFlexCollapsed);
    } else if (state === 'expanded') {
      this.setSize(this.igoFlexExpanded);
    } else if (state === 'initial') {
      this.setSize(this.igoFlexInitial);
    }

    this._state = state;
  }

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.el.nativeElement.style.flexDirection = this.igoFlexDirection;
    this.state = this.igoFlexState;
  }

  collapse() {
    this.state = 'collapsed';
  }

  expand() {
    this.state = 'expanded';
  }

  reset() {
    this.state = 'initial';
  }

  private setSize(size: string) {
    if (this.igoFlexDirection === 'column') {
      this.main.nativeElement.style.height = size;
    } else if (this.igoFlexDirection === 'row') {
      this.main.nativeElement.style.width = size;
    }
  }

}

import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

export type FlexState =
  'initial' | 'collapsed' | 'expanded' | 'transition';

export type FlexDirection =
  'column' | 'row';

@Component({
  selector: 'igo-flex',
  templateUrl: './flex.component.html',
  styleUrls: ['./flex.component.styl']
})
export class FlexComponent implements OnInit {

  static transitionTime = 250;

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
      this.collapse();
    } else if (state === 'expanded') {
      this.expand();
    } else if (state === 'initial') {
      this.reset();
    }

    this._state = state;
  }

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.el.nativeElement.style.flexDirection = this.igoFlexDirection;
    this.state = this.igoFlexState;
  }

  // We may want to do an angular transition to keep
  // the transition time out of the .styl.
  collapse() {
    this.setSize(this.igoFlexCollapsed);
    setTimeout(() => {
       this._state = 'collapsed';
    }, FlexComponent.transitionTime);
  }

  expand() {
    this.setSize(this.igoFlexExpanded);
     setTimeout(() => {
       this._state = 'expanded';
    }, FlexComponent.transitionTime);
  }

  reset() {
    this.setSize(this.igoFlexInitial);
    setTimeout(() => {
       this._state = 'initial';
    }, FlexComponent.transitionTime);
  }

  private setSize(size: string) {
    this._state = 'transition';

    if (this.igoFlexDirection === 'column') {
      this.main.nativeElement.style.height = size;
    } else if (this.igoFlexDirection === 'row') {
      this.main.nativeElement.style.width = size;
    }
  }

}

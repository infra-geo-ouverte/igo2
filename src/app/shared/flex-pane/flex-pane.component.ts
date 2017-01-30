import { Component, OnInit, Input, ContentChild, ElementRef } from '@angular/core';

import { FlexMainDirective } from './flex-main.directive';

type FlexState =
  'initial'
  | 'collapsed'
  | 'expanded';

type FlexDirection =
  'column'
  | 'row';

@Component({
  selector: 'igo-flex-pane',
  templateUrl: './flex-pane.component.html',
  styleUrls: ['./flex-pane.component.styl']
})
export class FlexPaneComponent implements OnInit {

  @Input('igoFlexInitial') igoFlexInitial: string;
  @Input('igoFlexCollapsed') igoFlexCollapsed: string = '0';
  @Input('igoFlexExpanded') igoFlexExpanded: string = '100%';
  @Input('igoFlexState') igoFlexState: FlexState = 'initial';
  @Input('igoFlexDirection') igoFlexDirection: FlexDirection = 'column';

  @ContentChild(FlexMainDirective) main;

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
    if (this.main === undefined) {
      throw new Error('No main directive found.');
    }

    this.el.nativeElement.style.flexDirection = this.igoFlexDirection;
    this.state = this.igoFlexState;
  }

  private setSize(size: string) {
    if (this.igoFlexDirection === 'column') {
      this.main.setHeight(size);
    } else if (this.igoFlexDirection === 'row') {
      this.main.setWidth(size);
    }
  }

}

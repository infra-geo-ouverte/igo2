import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

import { MediaService } from '../../core/media.service';

import { FlexibleState, FlexibleDirection} from './flexible';


@Component({
  selector: 'igo-flexible',
  templateUrl: './flexible.component.html',
  styleUrls: ['./flexible.component.styl']
})
export class FlexibleComponent implements OnInit {

  static transitionTime = 250;

  @ViewChild('flexibleMain') main;

  @Input('initial') initial: string;
  @Input('collapsed') collapsed: string = '0';
  @Input('expanded') expanded: string = '100%';

  @Input('initialMobile') initialMobile: string;
  @Input('collapsedMobile') collapsedMobile: string;
  @Input('expandedMobile') expandedMobile: string;

  @Input('direction') direction: FlexibleDirection = 'column';

  private _state: FlexibleState = 'initial';

  get state (): FlexibleState {
    return this._state;
  }

  @Input('state') set state (state: FlexibleState){
    const sizes = {
      initial: this.initial,
      collapsed: this.collapsed,
      expanded: this.expanded
    };

    const media = this.mediaService.media.value;
    if (media === 'mobile') {
      Object.assign(sizes, {
        initial: this.initialMobile,
        collapsed: this.collapsedMobile,
        expanded: this.expandedMobile
      });
    }

    const size = sizes[state];
    if (size !== undefined) {
      this.setSize(size);
      setTimeout(() => {
         this._state = state;
      }, FlexibleComponent.transitionTime);
    }
  }

  constructor(private el: ElementRef,
              private mediaService: MediaService) {}

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

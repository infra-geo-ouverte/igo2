import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

import { Media, MediaService } from '@igo2/igo2';

import { FlexibleState, FlexibleDirection} from './flexible.type';


@Component({
  selector: 'app-flexible',
  templateUrl: './flexible.component.html',
  styleUrls: ['./flexible.component.styl']
})
export class FlexibleComponent implements OnInit {

  static transitionTime = 250;

  @ViewChild('flexibleMain') main;

  @Input()
  get initial(): string { return this._initial; }
  set initial(value: string) {
    this._initial = value;
  }
  private _initial: string = '0';

  @Input()
  get collapsed(): string { return this._collapsed; }
  set collapsed(value: string) {
    this._collapsed = value;
  }
  private _collapsed: string = '0';

  @Input()
  get expanded(): string { return this._expanded; }
  set expanded(value: string) {
    this._expanded = value;
  }
  private _expanded: string = '100%';

  @Input()
  get initialMobile(): string { return this._initialMobile; }
  set initialMobile(value: string) {
    this._initialMobile = value;
  }
  private _initialMobile: string = this.expanded;

  @Input()
  get collapsedMobile(): string { return this._collapsedMobile; }
  set collapsedMobile(value: string) {
    this._collapsedMobile = value;
  }
  private _collapsedMobile: string = this.collapsed;

  @Input()
  get expandedMobile(): string { return this._expandedMobile; }
  set expandedMobile(value: string) {
    this._expandedMobile = value;
  }
  private _expandedMobile: string = this.expanded;

  @Input()
  get direction(): FlexibleDirection { return this._direction; }
  set direction(value: FlexibleDirection) {
    this._direction = value;
  }
  private _direction: FlexibleDirection = 'column';

  @Input()
  get state(): FlexibleState { return this._state; }
  set state(value: FlexibleState) {
    const sizes = {
      initial: this.initial,
      collapsed: this.collapsed,
      expanded: this.expanded
    };

    const media = this.mediaService.media$.value;
    if (media === 'mobile') {
      Object.assign(sizes, {
        initial: this.initialMobile,
        collapsed: this.collapsedMobile,
        expanded: this.expandedMobile
      });
    }

    const size = sizes[value];
    if (size !== undefined) {
      this.setSize(size);
      setTimeout(() => {
         this._state = value;
      }, FlexibleComponent.transitionTime);
    }
  }
  private _state: FlexibleState= 'initial';

  constructor(private el: ElementRef,
              private mediaService: MediaService) {}

  ngOnInit() {
    this.el.nativeElement.className += this.direction;

    // Since this component supports different sizes
    // on mobile, force a redraw when the media changes
    this.mediaService.media$
      .subscribe((media: Media) => this.state = this.state);
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

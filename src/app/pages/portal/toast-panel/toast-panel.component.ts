import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostBinding,
  ChangeDetectionStrategy,
  ElementRef,
  ViewChild
} from '@angular/core';

import { getEntityTitle, EntityStore } from '@igo2/common';

import { Feature, SearchResult } from '@igo2/geo';

import { showContent } from './toast-panel.animations';

@Component({
  selector: 'app-toast-panel',
  templateUrl: './toast-panel.component.html',
  styleUrls: ['./toast-panel.component.scss'],
  animations: [showContent()]
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastPanelComponent {
  private opened: boolean = true;
  //
  // @Input()
  // get title(): string {
  //   return this._title;
  // }
  // set title(value: string) {
  //   this._title = value;
  // }
  // private _title: string;

  @Input() results: SearchResult<Feature>[];

  @Input() store: EntityStore<SearchResult<Feature>[]>;

  resultSelected: SearchResult<Feature>;

  // @Output() openedChange = new EventEmitter<boolean>();
  // @Output() close = new EventEmitter<boolean>();

  @HostBinding('class.app-toast-panel-opened')
  get hasOpenedClass() {
    return this.opened;
  }

  // @HostBinding('style.visibility')
  // get displayStyle() {
  //   return this.opened ? 'visible' : 'hidden';
  // }

  // @ViewChild('content') content: ElementRef;
  //
  // get empty(): boolean {
  //   return this.content.nativeElement.children.length === 0;
  // }

  constructor() {}

  getTitle(result: SearchResult) {
    return getEntityTitle(result);
  }

  selectResult(result: SearchResult<Feature>) {
    this.resultSelected = result;
  }

  onToggleClick() {
    this.opened = !this.opened;
  }

  onCloseClick() {
    this.results = undefined;
  }

  onPreviousClick() {
    let i = this.results.indexOf(this.resultSelected);
    const previousResult = this.results[i--];
    if (previousResult) {
      this.selectResult(previousResult);
    }
  }

  onNextClick() {
    let i = this.results.indexOf(this.resultSelected);
    const nextResult = this.results[i++];
    if (nextResult) {
      this.selectResult(nextResult);
    }
  }

  onListClick() {
    this.selectResult(undefined);
  }

  onResultSelect(result: SearchResult<Feature>) {
    this.selectResult(result);
    this.addFeatureToMap(result);
  }

  // onResultSelect(result: SearchResult<Feature>) {
  //   this.addFeatureToMap(result);
  // }

  private addFeatureToMap(result: SearchResult<Feature>) {
    const feature = result.data;

    // Somethimes features have no geometry. It happens with some GetFeatureInfo
    if (feature.geometry === undefined) {
      return;
    }

    // this.map.overlay.setFeatures([feature], FeatureMotion.Default);
  }
}

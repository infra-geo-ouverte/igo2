import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostBinding,
  ChangeDetectionStrategy
} from '@angular/core';

import { getEntityTitle } from '../../../modules/entity/shared';
import { Feature } from '../../../modules/feature/shared';

@Component({
  selector: 'fadq-toast-panel',
  templateUrl: './toast-panel.component.html',
  styleUrls: ['./toast-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastPanelComponent {

  @Input()
  get opened(): boolean {
    return this._opened;
  }
  set opened(value: boolean) {
    if (value === this._opened) {
      return;
    }
    this._opened = value;
    this.openedChange.emit(this._opened);
  }
  private _opened: boolean;

  @Input()
  get title(): string {
    if (this._title !== undefined) {
      return this._title;
    }
    return this.feature === undefined ? undefined : getEntityTitle(this.feature);
  }
  set title(value: string) {
    this._title = value;
  }
  private _title: string;

  @Input()
  get features(): Feature[] {
    return this._features;
  }
  set features(value: Feature[]) {
    this._features = value || [];
    if (!this.empty) {
      this.toggleDisplay();
    }
  }
  private _features: Feature[] = [];

  @Output() openedChange = new EventEmitter<boolean>();

  @HostBinding('class.fadq-toast-panel-opened')
  get hasOpenedClass() {
    return this.opened;
  }

  @HostBinding('class.fadq-toast-panel-with-features')
  get hasWithFeaturesClass() {
    return this.features === undefined ? false : true;
  }

  get empty(): boolean {
    return this.features.length === 0;
  }

  get feature(): Feature | undefined {
    if (this.empty) {
      return undefined;
    }
    return this.features[0];
  }

  constructor() {}

  private toggleDisplay() {
    (document.querySelector('fadq-toast-panel') as HTMLElement).style.display = 'block';
  }

}

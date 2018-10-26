import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostBinding,
  ChangeDetectionStrategy
} from '@angular/core';

import { getRecordTitle, Record } from '../../../modules/data/shared';
import { getFeatureFromRecord, Feature } from '../../../modules/feature/shared';


@Component({
  selector: 'fadq-info-panel',
  templateUrl: './info-panel.component.html',
  styleUrls: ['./info-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoPanelComponent {

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
    return this.record === undefined ? undefined : getRecordTitle(this.record);
  }
  set title(value: string) {
    this._title = value;
  }
  private _title: string;

  @Input()
  get records(): Record[] {
    return this._records;
  }
  set records(value: Record[]) {
    this._records = value || [];
    if (!this.empty) {
      this.toggleDisplay();
    }
  }
  private _records: Record[] = [];

  @Output() openedChange = new EventEmitter<boolean>();

  @HostBinding('class.fadq-info-panel-opened')
  get hasOpenedClass() {
    return this.opened;
  }

  @HostBinding('class.fadq-info-panel-with-records')
  get hasWithRecordsClass() {
    return this.records === undefined ? false : true;
  }

  get empty(): boolean {
    return this.records.length === 0;
  }

  get record(): Record | undefined {
    if (this.empty) {
      return undefined;
    }
    return this.records[0];
  }

  get feature(): Feature | undefined {
    if (this.record) {
      return getFeatureFromRecord(this.record);
    }
    return undefined;
  }

  constructor() {}

  private toggleDisplay() {
    (document.querySelector('fadq-info-panel') as HTMLElement).style.display = 'block';
  }

}

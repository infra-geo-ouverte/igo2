import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import {
  getRecordTitle,
  getRecordTitleHtml,
  getRecordIcon
} from '../../data/shared/data.utils';
import { Record } from '../../data/shared/data.interface';

@Component({
  selector: 'fadq-search-store-item',
  templateUrl: './search-store-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchStoreItemComponent {

  @Input()
  get record(): Record {
    return this._record;
  }
  set record(value: Record) {
    this._record = value;
  }
  private _record: Record;

  get title(): string {
    return getRecordTitle(this.record);
  }

  get titleHtml(): string {
    return getRecordTitleHtml(this.record);
  }

  get icon(): string {
    return getRecordIcon(this.record);
  }

  constructor() {}
}

import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import {
  getEntityTitle,
  getEntityTitleHtml,
  getEntityIcon
} from '../../entity/shared/entity.utils';
import { SearchResult } from '../shared/search.interface';

@Component({
  selector: 'fadq-search-results-item',
  templateUrl: './search-results-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultsItemComponent {

  @Input()
  get result(): SearchResult {
    return this._result;
  }
  set result(value: SearchResult) {
    this._result = value;
  }
  private _result: SearchResult;

  get title(): string {
    return getEntityTitle(this.result);
  }

  get titleHtml(): string {
    return getEntityTitleHtml(this.result);
  }

  get icon(): string {
    return getEntityIcon(this.result);
  }

  constructor() {}
}

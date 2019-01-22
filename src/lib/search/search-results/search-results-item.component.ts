import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import {
  getEntityTitle,
  getEntityTitleHtml,
  getEntityIcon
} from 'src/lib/entity';

import { SearchResult } from '../shared';

/**
 * Search results list item
 */
@Component({
  selector: 'fadq-search-results-item',
  templateUrl: './search-results-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultsItemComponent {

  /**
   * Search result
   */
  @Input() result: SearchResult;

  /**
   * Search result title
   * @internal
   */
  get title(): string { return getEntityTitle(this.result); }

  /**
   * Search result HTML title
   * @internal
   */
  get titleHtml(): string { return getEntityTitleHtml(this.result); }

  /**
   * Search result icon
   * @internal
   */
  get icon(): string { return getEntityIcon(this.result); }

  constructor() {}
}

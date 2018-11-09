import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import {
  getEntityTitle,
  getEntityTitleHtml,
  getEntityIcon
} from '../../entity/shared/entity.utils';
import { Entity } from '../../entity/shared/entity.interface';

@Component({
  selector: 'fadq-search-results-item',
  templateUrl: './search-results-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultsItemComponent {

  @Input()
  get entity(): Entity {
    return this._entity;
  }
  set entity(value: Entity) {
    this._entity = value;
  }
  private _entity: Entity;

  get title(): string {
    return getEntityTitle(this.entity);
  }

  get titleHtml(): string {
    return getEntityTitleHtml(this.entity);
  }

  get icon(): string {
    return getEntityIcon(this.entity);
  }

  constructor() {}
}

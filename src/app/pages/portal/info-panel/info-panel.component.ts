import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostBinding,
  ChangeDetectionStrategy
} from '@angular/core';

import { getEntityTitle, Entity } from '../../../modules/entity/shared';
import { Feature } from '../../../modules/feature/shared';


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
    return this.entity === undefined ? undefined : getEntityTitle(this.entity);
  }
  set title(value: string) {
    this._title = value;
  }
  private _title: string;

  @Input()
  get entities(): Entity[] {
    return this._entities;
  }
  set entities(value: Entity[]) {
    this._entities = value || [];
    if (!this.empty) {
      this.toggleDisplay();
    }
  }
  private _entities: Entity[] = [];

  @Output() openedChange = new EventEmitter<boolean>();

  @HostBinding('class.fadq-info-panel-opened')
  get hasOpenedClass() {
    return this.opened;
  }

  @HostBinding('class.fadq-info-panel-with-entities')
  get hasWithEntitiesClass() {
    return this.entities === undefined ? false : true;
  }

  get empty(): boolean {
    return this.entities.length === 0;
  }

  get entity(): Entity | undefined {
    if (this.empty) {
      return undefined;
    }
    return this.entities[0];
  }

  get feature(): Feature | undefined {
    return this.entity as Feature;
  }

  constructor() {}

  private toggleDisplay() {
    (document.querySelector('fadq-info-panel') as HTMLElement).style.display = 'block';
  }

}

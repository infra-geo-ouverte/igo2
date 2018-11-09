import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy
} from '@angular/core';


import { Entity } from '../../entity/shared/entity.interface';
import { EntityStore } from '../../entity/shared/store';
import { EntityStoreController } from '../../entity/shared/controller';
import { SearchSource } from '../shared/sources/source';

export enum DisplayMode {
  Grouped = 'grouped',
  Flat = 'flat'
}

@Component({
  selector: 'fadq-search-results',
  templateUrl: './search-results.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultsComponent implements OnInit, OnDestroy {

  public displayMode = DisplayMode;

  private controller: EntityStoreController;

  @Input()
  get store(): EntityStore<Entity> {
    return this._store;
  }
  set store(value: EntityStore<Entity>) {
    this._store = value;
  }
  private _store;

  @Input()
  get mode(): DisplayMode {
    return this._mode;
  }
  set mode(value: DisplayMode) {
    this._mode = value;
  }
  private _mode: DisplayMode = DisplayMode.Grouped;

  @Output() focus = new EventEmitter<Entity>();
  @Output() select = new EventEmitter<Entity>();
  @Output() unfocus = new EventEmitter<Entity>();
  @Output() unselect = new EventEmitter<Entity>();

  constructor(private cdRef: ChangeDetectorRef) {
    this.controller = new EntityStoreController()
      .withChangeDetector(this.cdRef);
  }

  ngOnInit() {
    this.controller.bind(this.store);
  }

  ngOnDestroy() {
    this.controller.unbind();
  }

  sortByOrder(entity1: Entity, entity2: Entity) {
    return (
      (entity1.provider as any as SearchSource).displayOrder -
      (entity2.provider as any as SearchSource).displayOrder
    );
  }

  focusEntity(entity: Entity) {
    this.controller.updateEntityState(entity, {focused: true}, true);
    this.focus.emit(entity);
  }

  selectEntity(entity: Entity) {
    this.controller.updateEntityState(entity, {
      focused: true,
      selected: true
    }, true);
    this.select.emit(entity);
  }

}

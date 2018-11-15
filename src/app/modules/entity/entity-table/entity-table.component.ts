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

import { Observable } from 'rxjs';
import t from 'typy';

import {
  Entity,
  EntityTableModel,
  EntityTableColumn
} from '../shared/entity.interface';
import { EntityStore } from '../shared/store';
import { EntityStoreController } from '../shared/controller';

@Component({
  selector: 'fadq-entity-table',
  templateUrl: './entity-table.component.html',
  styleUrls: ['./entity-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityTableComponent implements OnInit, OnDestroy {

  private controller: EntityStoreController;

  @Input()
  get store(): EntityStore<Entity> {
    return this._store;
  }
  set store(value: EntityStore<Entity>) {
    this._store = value;
  }
  private _store: EntityStore<Entity>;

  @Input()
  get model(): EntityTableModel {
    return this._model;
  }
  set model(value: EntityTableModel) {
    this._model = value;
  }
  private _model: EntityTableModel;

  @Output() select = new EventEmitter<Entity>();

  get headers(): string[] {
    return this.model.columns
      .filter((column: EntityTableColumn) => column.visible !== false)
      .map((column: EntityTableColumn) => column.name);
  }

  get dataSource(): Observable<Entity[]> {
    return this.store.observable;
  }

  constructor(private cdRef: ChangeDetectorRef) {
    this.controller = new EntityStoreController()
      .withChangeDetector(this.cdRef);
  }

  ngOnInit() {
    this.controller.bind(this.store);
    // TODO: Clear sort when records change
  }

  ngOnDestroy() {
    this.controller.unbind();
  }

  valueAccessor(entity: Entity, column: EntityTableColumn) {
    return t(entity.data, column.name).safeObject;
  }

  sort(columnName: string, direction: string) {
    if (direction === 'asc' || direction === 'desc') {
      this.store.sort(columnName, direction);
    }
  }

  selectEntity(entity: Entity) {
    if (!this.model.selection) {
      return;
    }

    this.controller.updateEntityState(entity, {
      focused: true,
      selected: true
    }, true);
    this.select.emit(entity);
  }

  getTableClass(): { [key: string]: boolean; } {
    const selection = this.model.selection || false;
    return {
      'fadq-entity-table-with-selection': selection
    };
  }

  getRowClass(entity: Entity): { [key: string]: boolean; } {
    const func = this.model.rowClassFunc;
    if (func instanceof Function) {
      return func(entity);
    }

    const state = this.store.getEntityState(entity);
    return {
      'fadq-entity-table-row-selected': state.selected
    };
  }

  getCellClass(entity: Entity, column: EntityTableColumn): { [key: string]: boolean; } {
    const func = this.model.cellClassFunc;
    if (func instanceof Function) {
      return func(entity, column);
    }
    return {};
  }

}

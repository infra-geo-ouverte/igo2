import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  OnInit,
  OnChanges,
  OnDestroy,
  SimpleChanges
} from '@angular/core';

import { Observable } from 'rxjs';

import {
  Entity,
  EntityTableTemplate,
  EntityTableColumn,
  EntityStore,
  EntityStoreController,
  getEntityProperty
} from '../shared';

@Component({
  selector: 'fadq-entity-table',
  templateUrl: './entity-table.component.html',
  styleUrls: ['./entity-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityTableComponent implements OnInit, OnChanges, OnDestroy  {

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
  get template(): EntityTableTemplate {
    return this._template;
  }
  set template(value: EntityTableTemplate) {
    this._template = value;
  }
  private _template: EntityTableTemplate;

  @Output() entitySelectChange = new EventEmitter<{
    selected: boolean;
    entity: Entity;
  }>();

  get headers(): string[] {
    return this.template.columns
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
    // TODO: clear sort order display
  }

  ngOnChanges(changes: SimpleChanges) {
    const store = changes.store;
    if (store && store.currentValue !== store.previousValue) {
      this.controller.bind(this.store);
    }
  }

  ngOnDestroy() {
    this.controller.unbind();
  }

  onSort(event: {active: string, direction: string}) {
    const property = event.active;
    const direction = event.direction;
    if (direction === 'asc' || direction === 'desc') {
      this.store.sorter.set({property, direction});
    } else {
      this.store.sorter.reset();
    }
  }

  onEntitySelect(entity: Entity) {
    if (!this.template.selection) {
      return;
    }

    this.controller.updateEntityState(entity, {
      focused: true,
      selected: true
    }, true);
    this.entitySelectChange.emit({selected: true, entity});
  }

  valueAccessor(entity: Entity, column: EntityTableColumn) {
    return getEntityProperty(entity, column.name);
  }

  columnIsSortable(column: EntityTableColumn): boolean {
    let sortable = column.sort;
    if (sortable === undefined) {
      sortable = this.template.sort === undefined ? false : this.template.sort;
    }
    return sortable;
  }

  getTableClass(): { [key: string]: boolean; } {
    const selection = this.template.selection || false;
    return {
      'fadq-entity-table-with-selection': selection
    };
  }

  getRowSelected(entity: Entity): boolean {
    const state = this.store.getEntityState(entity);
    return state.selected ? state.selected : false;
  }

  getRowClass(entity: Entity): { [key: string]: boolean; } {
    const func = this.template.rowClassFunc;
    if (func instanceof Function) {
      return func(entity);
    }
    return {};
  }

  getCellClass(entity: Entity, column: EntityTableColumn): { [key: string]: boolean; } {
    const func = this.template.cellClassFunc;
    if (func instanceof Function) {
      return func(entity, column);
    }
    return {};
  }

}

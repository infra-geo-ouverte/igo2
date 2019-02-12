import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  SimpleChanges,
  OnInit,
  OnDestroy,
  OnChanges
} from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import {
  EntityStore,
  EntityStoreController,
  EntityTableTemplate,
  EntityTableColumn,
  EntityTableColumnRenderer
} from '../shared';

@Component({
  selector: 'fadq-entity-table',
  templateUrl: './entity-table.component.html',
  styleUrls: ['./entity-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityTableComponent implements OnInit, OnDestroy, OnChanges  {

  /**
   * Reference to the column renderer types
   * @internal
   */
  entityTableColumnRenderer = EntityTableColumnRenderer;

  /**
   * Entity store controller
   */
  private controller: EntityStoreController<object>;

  /**
   * Entity store
   */
  @Input() store: EntityStore<object>;

  /**
   * Table template
   */
  @Input() template: EntityTableTemplate;

  /**
   * Event emitted when an entity (row) is clicked
   */
  @Output() entityClick = new EventEmitter<object>();

  /**
   * Event emitted when an entity (row) is selected
   */
  @Output() entitySelectChange = new EventEmitter<{
    selected: boolean;
    entity: object;
  }>();

  /**
   * Table headers
   * @internal
   */
  get headers(): string[] {
    return this.template.columns
      .filter((column: EntityTableColumn) => column.visible !== false)
      .map((column: EntityTableColumn) => column.name);
  }

  /**
   * Data source consumable by the underlying material table
   * @internal
   */
  get dataSource(): BehaviorSubject<object[]> { return this.store.view.all$(); }

  /**
   * Whether selection is supported
   * @internal
   */
  get selection(): boolean { return this.template.selection || false; }

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    // TODO: clear sort order display
  }

  /**
   * When the store change, create a new controller
   * @param changes
   * @internal
   */
  ngOnChanges(changes: SimpleChanges) {
    const store = changes.store;
    if (store && store.currentValue !== store.previousValue) {
      if (this.controller !== undefined) {
        this.controller.destroy();
      }
      this.controller = new EntityStoreController(this.store, this.cdRef);
    }
  }

  /**
   * Unbind the store controller
   * @internal
   */
  ngOnDestroy() {
    if (this.controller !== undefined) {
      this.controller.destroy();
    }
  }

  /**
   * Trigger a refresh of thre table. This can be useful when
   * the data source doesn't emit a new value but for some reason
   * the records need an update.
   * @internal
   */
  refresh() {
    this.cdRef.detectChanges();
  }

  /**
   * On sort, sort the store
   * @param event Sort event
   * @internal
   */
  onSort(event: {active: string, direction: string}) {
    const direction = event.direction;
    const column = this.template.columns
      .find((c: EntityTableColumn) => c.name === event.active);

    if (direction === 'asc' || direction === 'desc') {
      this.store.view.sort({
        valueAccessor: (entity: object) => this.getValue(entity, column),
        direction
      });
    } else {
      this.store.view.sort(undefined);
    }
  }

  /**
   * When an entity is clicked, emit an event
   * @param entity Entity
   * @internal
   */
  onRowClick(entity: object) {
    this.entityClick.emit(entity);
  }

  /**
   * When an entity is selected, select it in the store and emit an event
   * @param entity Entity
   * @internal
   */
  onRowSelect(entity: object) {
    if (this.selection === false) { return; }
    this.store.state.update(entity, {selected: true}, true);
    this.entitySelectChange.emit({selected: true, entity});
  }

  /**
   * Whether a column is sortable
   * @param column Column
   * @returns True if a column is sortable
   * @internal
   */
  columnIsSortable(column: EntityTableColumn): boolean {
    let sortable = column.sort;
    if (sortable === undefined) {
      sortable = this.template.sort === undefined ? false : this.template.sort;
    }
    return sortable;
  }

  /**
   * Whether a row is should be selected based on the underlying entity state
   * @param entity Entity
   * @returns True if a row should be selected
   * @internal
   */
  rowIsSelected(entity: object): boolean {
    const state = this.store.state.get(entity);
    return state.selected ? state.selected : false;
  }

  /**
   * Method to access an entity's values
   * @param entity Entity
   * @param column Column
   * @returns Any value
   * @internal
   */
  getValue(entity: object, column: EntityTableColumn): any {
    if (column.valueAccessor !== undefined) {
      return column.valueAccessor(entity);
    }
    if (this.template.valueAccessor !== undefined) {
      return this.template.valueAccessor(entity, column.name);
    }
    return this.store.getProperty(entity, column.name);
  }

  /**
   * Return the type of renderer of a column
   * @param column Column
   * @returns Renderer type
   * @internal
   */
  getColumnRenderer(column: EntityTableColumn): EntityTableColumnRenderer {
    if (column.renderer !== undefined) {
      return column.renderer;
    }
    return EntityTableColumnRenderer.Default;
  }

  /**
   * Return the table ngClass
   * @returns ngClass
   * @internal
   */
  getTableClass(): {[key: string]: boolean} {
    return {
      'fadq-entity-table-with-selection': this.selection
    };
  }

  /**
   * Return a row ngClass
   * @param entity Entity
   * @returns ngClass
   * @internal
   */
  getRowClass(entity: object): {[key: string]: boolean} {
    const func = this.template.rowClassFunc;
    if (func instanceof Function) {
      return func(entity);
    }
    return {};
  }

  /**
   * Return a row ngClass
   * @param entity Entity
   * @param column Column
   * @returns ngClass
   * @internal
   */
  getCellClass(entity: object, column: EntityTableColumn): {[key: string]: boolean} {
    const cls = {};

    const tableFunc = this.template.cellClassFunc;
    if (tableFunc instanceof Function) {
      Object.assign(cls, tableFunc(entity, column));
    }

    const columnFunc = column.cellClassFunc;
    if (columnFunc instanceof Function) {
      Object.assign(cls, columnFunc(entity));
    }

    return cls;
  }

}

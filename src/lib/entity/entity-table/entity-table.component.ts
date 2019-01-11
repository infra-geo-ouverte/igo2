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

import { BehaviorSubject } from 'rxjs';

import {
  Entity,
  EntityTableTemplate,
  EntityTableColumn,
  EntityStore,
  EntityStoreController,
  getEntityId,
  getEntityProperty,
  EntityTableColumnRenderer
} from '../shared';

/**
 * Connect to en entity store and display value in a table.
 * Supports sorting and selection.
 */
@Component({
  selector: 'fadq-entity-table',
  templateUrl: './entity-table.component.html',
  styleUrls: ['./entity-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityTableComponent implements OnInit, OnChanges, OnDestroy  {

  /**
   * Reference to the column renderer types
   * @internal
   */
  entityTableColumnRenderer = EntityTableColumnRenderer;

  /**
   * Entity store controller
   */
  private controller: EntityStoreController;

  /**
   * Entity store
   */
  @Input() store: EntityStore<Entity>;

  /**
   * Table template
   */
  @Input() template: EntityTableTemplate;

  /**
   * Event emitted when an entity (row) is clicked
   */
  @Output() entityClick = new EventEmitter<Entity>();

  /**
   * Event emitted when an entity (row) is selected
   */
  @Output() entitySelectChange = new EventEmitter<{
    selected: boolean;
    entity: Entity;
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
  get dataSource(): BehaviorSubject<Entity[]> { return this.store.entities$; }

  /**
   * Data source consumable by the underlying material table
   * ready for the next material upgrade.
   * @internal
   */
  // get dataSource(): EntityTableComponent { return this; }

  /**
   * Angular material trackBy function. Improves performance.
   * @internal
   */
  get trackBy(): (Entity) => string {
    return getEntityId;
  }

  constructor(private cdRef: ChangeDetectorRef) {
    this.controller = new EntityStoreController()
      .withChangeDetector(this.cdRef);
  }

  /**
   * Clear the sort order display
   * @internal
   */
  ngOnInit() {
    // TODO: clear sort order display (arrow)
  }

  /**
   * When the store change, bind the controller to the new store
   * @param changes
   * @internal
   */
  ngOnChanges(changes: SimpleChanges) {
    const store = changes.store;
    if (store && store.currentValue !== store.previousValue) {
      this.controller.bindStore(this.store);
    }
  }

  /**
   * Unbind the store controller
   * @internal
   */
  ngOnDestroy() {
    this.controller.unbindStore();
  }

  /**
   * Implemented as part of the DataSource interface
   * @internal
   */
  connect(): BehaviorSubject<Entity[]> {
    return this.store.entities$;
  }

  /**
   * On sort, sort the store
   * @param event Sort event
   * @internal
   */
  onSort(event: {active: string, direction: string}) {
    const property = event.active;
    const direction = event.direction;
    if (direction === 'asc' || direction === 'desc') {
      this.store.sorter.set({property, direction});
    } else {
      this.store.sorter.reset();
    }
  }

  /**
   * When an entity is clicked, emit an event
   * @param entity Entity
   * @internal
   */
  onEntityClick(entity: Entity) {
    this.entityClick.emit(entity);
  }

  /**
   * When an entity is selected, select it in the store and emit an event
   * @param entity Entity
   * @internal
   */
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

  /**
   * Method to access an entity's values
   * @param entity Entity
   * @param column Column
   * @returns Any value
   * @internal
   */
  valueAccessor(entity: Entity, column: EntityTableColumn): any {
    if (column.valueAccessor !==  undefined) {
      return column.valueAccessor(entity);
    }
    return getEntityProperty(entity, column.name);
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
   * Return the table ngClass
   * @returns ngClass
   * @internal
   */
  getTableClass(): { [key: string]: boolean; } {
    const selection = this.template.selection || false;
    return {
      'fadq-entity-table-with-selection': selection
    };
  }

  /**
   * Whether a row is should be selected based on the underlying entity state
   * @param entity Entity
   * @returns True if a row should be selected
   * @internal
   */
  getRowSelected(entity: Entity): boolean {
    const state = this.store.getEntityState(entity);
    return state.selected ? state.selected : false;
  }

  /**
   * Return a row ngClass
   * @param entity Entity
   * @returns ngClass
   * @internal
   */
  getRowClass(entity: Entity): { [key: string]: boolean; } {
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
  getCellClass(entity: Entity, column: EntityTableColumn): { [key: string]: boolean; } {
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

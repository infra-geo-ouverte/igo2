import { Subscription, BehaviorSubject } from 'rxjs';

import {
  Entity,
  EntityClass,
  EntityTableModel,
  State
} from '../../entity/shared/entity.interface';
import { EntityStore } from '../../entity/shared/store';
import { Widget } from '../../widget/shared/widget.interface';
import { EditorConfig } from './edition.interface';

export class Editor extends EntityClass {

  public widget$ = new BehaviorSubject<Widget>(undefined);
  public entity$ = new BehaviorSubject<Entity>(undefined);

  private activeWidget$$: Subscription;
  private selectedEntity$$: Subscription;

  get id(): string {
    return this.config.id;
  }

  get title(): string {
    return this.config.title;
  }

  get hasComponent(): boolean {
    return this.widget && this.widget.component !== undefined;
  }

  get tableModel(): EntityTableModel {
    return this.config.tableModel;
  }

  get entityStore():  EntityStore<Entity> {
    return this._entityStore;
  }
  private _entityStore: EntityStore<Entity>;

  get widgetStore():  EntityStore<Widget> {
    return this._widgetStore;
  }
  private _widgetStore: EntityStore<Widget>;

  get widget(): Widget {
    return this.widget$.value;
  }

  get entity(): Entity {
    return this.entity$.value;
  }

  constructor(private config: EditorConfig) {
    super();
  }

  bindEntityStore(entityStore: EntityStore<Entity>): Editor {
    this.unbindEntityStore();
    this._entityStore = entityStore;

    return this;
  }

  unbindEntityStore(): Editor {
    this._entityStore = undefined;

    return this;
  }

  bindWidgetStore(widgetStore: EntityStore<Widget>): Editor {
    this.unbindWidgetStore();
    this._widgetStore = widgetStore;

    return this;
  }

  unbindWidgetStore(): Editor {
    this._widgetStore = undefined;

    return this;
  }

  init() {
    this.activeWidget$$ = this.widgetStore
      .observeFirstBy((widget: Widget, state: State) => state.active === true)
      .subscribe((widget: Widget) => this.onActivateWidget(widget));

    this.selectedEntity$$ = this.entityStore
      .observeFirstBy((entity: Entity, state: State) => state.selected === true)
      .subscribe((entity: Entity) => this.onSelectEntity(entity));
  }

  destroy() {
    if (this.activeWidget$$ !== undefined) {
      this.activeWidget$$.unsubscribe();
    }
    if (this.selectedEntity$$ !== undefined) {
      this.selectedEntity$$.unsubscribe();
    }
  }

  getComponentData(): { [key: string]: any } {
    return Object.assign({}, {entity: this.entity});
  }

  protected onActivateWidget(widget: Widget) {
    this.widget$.next(widget);
  }

  protected onSelectEntity(entity: Entity) {
    this.entity$.next(entity);
  }

}

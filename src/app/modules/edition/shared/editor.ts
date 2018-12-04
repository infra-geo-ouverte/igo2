import { Subscription, BehaviorSubject } from 'rxjs';

import {
  Entity,
  EntityClass,
  EntityTableTemplate,
  State
} from '../../entity/shared/entity.interface';
import { EntityStore } from '../../entity/shared/store';
import { Widget } from '../../widget/shared/widget.interface';
import { EditorConfig } from './edition.interface';

export class Editor extends EntityClass {

  public activeWidget$ = new BehaviorSubject<Widget>(undefined);
  public entity$ = new BehaviorSubject<Entity>(undefined);
  public widgetData$ = new BehaviorSubject<{ [key: string]: any }>({});

  private activeWidget$$: Subscription;
  private selectedEntity$$: Subscription;
  private widgetData$$: Subscription;

  get id(): string {
    return this.config.id;
  }

  get title(): string {
    return this.config.title;
  }

  get hasComponent(): boolean {
    return this.activeWidget && this.activeWidget.component !== undefined;
  }

  get tableTemplate(): EntityTableTemplate {
    return this.config.tableTemplate;
  }

  get entityStore():  EntityStore<Entity> {
    return this._entityStore;
  }
  private _entityStore: EntityStore<Entity>;

  get widgetStore():  EntityStore<Widget> {
    return this._widgetStore;
  }
  private _widgetStore: EntityStore<Widget>;

  get activeWidget(): Widget {
    return this.activeWidget$.value;
  }

  get entity(): Entity {
    return this.entity$.value;
  }

  get widgetData(): { [key: string]: any } {
    return this.widgetData$.value;
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

    this.widgetData$$ = this.widgetData$
      .subscribe((data: { [key: string]: any }) => this.onWidgetDataChange(data));
  }

  destroy() {
    this.deactivateWidget();

    if (this.activeWidget$$ !== undefined) {
      this.activeWidget$$.unsubscribe();
    }
    if (this.selectedEntity$$ !== undefined) {
      this.selectedEntity$$.unsubscribe();
    }
    if (this.widgetData$$ !== undefined) {
      this.widgetData$$.unsubscribe();
    }
  }

  activateWidget(widget: Widget) {
    this.widgetStore.updateEntityState(widget, {active: true}, true);
  }

  deactivateWidget() {
    if (this.activeWidget !== undefined) {
      this.widgetStore.updateEntityState(this.activeWidget, {active: false});
    }
  }

  protected onActivateWidget(widget: Widget) {
    this.activeWidget$.next(widget);
  }

  protected onSelectEntity(entity: Entity) {
    this.entity$.next(entity);
    this.widgetData$.next(this.computeWidgetData());
  }

  protected computeWidgetData(): { [key: string]: any } {
    return Object.assign({}, {
      entity: this.entity,
      store: this.entityStore
    });
  }

  private onWidgetDataChange(data: { [key: string]: any }) {
    this.initWidgets();
  }

  private initWidgets() {
    const widgetData = this.widgetData;
    this.widgetStore.entities.forEach((widget: Widget) => {
      let widgetIsReady = true;
      if (widget.hasOwnProperty('isReady')) {
        widgetIsReady = widget.isReady(widgetData);
      }

      const state = {
        disabled: !widgetIsReady,
        selected: !widgetIsReady
      };
      if (!widgetIsReady) {
        state['active'] = false;
      }
      this.widgetStore.updateEntityState(widget, state);
    });
  }

}

import { Subscription, BehaviorSubject } from 'rxjs';

import { Action } from 'src/lib/action';
import {
  Entity,
  EntityClass,
  EntityStore,
  EntityTableTemplate,
  State
} from 'src/lib/entity';
import { Widget } from 'src/lib/widget';

import { EditorConfig } from './edition.interfaces';

export class Editor extends EntityClass {

  public entity$ = new BehaviorSubject<Entity>(undefined);
  public widget$ = new BehaviorSubject<Widget>(undefined);
  public widgetInputs$ = new BehaviorSubject<{ [key: string]: any }>({});

  private entity$$: Subscription;

  get id(): string {
    return this.config.id;
  }

  get title(): string {
    return this.config.title;
  }

  get tableTemplate(): EntityTableTemplate {
    return this.config.tableTemplate;
  }

  get entityStore(): EntityStore<Entity> {
    return this.config.entityStore;
  }

  get actionStore(): EntityStore<Action> {
    return this.config.actionStore;
  }

  get entity(): Entity {
    return this.entity$.value;
  }

  get widget(): Widget {
    return this.widget$.value;
  }

  get hasComponent(): boolean {
    return this.widget$.value !== undefined;
  }

  constructor(private config: EditorConfig) {
    super();
  }

  init() {
    this.entity$$ = this.entityStore
      .observeFirstBy((entity: Entity, state: State) => state.selected === true)
      .subscribe((entity: Entity) => this.onSelectEntity(entity));
  }

  destroy() {
    this.deactivateWidget();

    if (this.entity$$ !== undefined) {
      this.entity$$.unsubscribe();
    }
  }

  activateWidget(widget: Widget, inputs: {[key: string]: any} = {}) {
    this.widget$.next(widget);
    this.widgetInputs$.next(inputs);
  }

  deactivateWidget() {
    this.updateActionsAvailability();
    this.widget$.next(undefined);
  }

  protected onSelectEntity(entity: Entity) {
    this.entity$.next(entity);
    this.updateActionsAvailability();
  }

  private updateActionsAvailability() {
    const availables = [];
    const unavailables = [];

    this.actionStore.entities.forEach((action: Action) => {
      const conditions = action.conditions || [];
      const available = conditions.every((condition: () => boolean) => condition());
      available ? availables.push(action) : unavailables.push(action);
    });

    if (unavailables.length > 0) {
      this.actionStore.updateEntitiesState(unavailables, {
        disabled: true,
        active: false
      });
    }

    if (availables.length > 0) {
      this.actionStore.updateEntitiesState(availables, {
        disabled: false
      });
    }
  }

}

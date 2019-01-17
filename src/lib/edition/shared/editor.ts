import { Subscription, BehaviorSubject, Subject } from 'rxjs';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';

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

/**
 * This class is responsible of managing the relations between
 * entities and the actions that consume them. It also defines an
 * entity table template that may be used by an entity table component.
 */
export class Editor extends EntityClass {

  /**
   * Observable of the selected entity
   */
  public entity$ = new BehaviorSubject<Entity>(undefined);

  /**
   * Observable of the selected widget
   */
  public widget$ = new BehaviorSubject<Widget>(undefined);

  /**
   * Observable of the selected widget's inputs
   */
  public widgetInputs$ = new BehaviorSubject<{ [key: string]: any }>({});

  /**
   * Subscription to the selected entity
   */
  private entity$$: Subscription;

  /**
   * Whether this editor is active
   */
  private active: boolean = false;

  /**
   * State change that trigger an update of the actions availability
   */
  private changes$: Subject<void> = new Subject();

  /**
   * Subscription to state changes
   */
  private changes$$: Subscription;

  /**
   * Editor id
   */
  get id(): string { return this.config.id; }

  /**
   * Editor title
   */
  get title(): string { return this.config.title; }

  /**
   * Entity table template
   */
  get tableTemplate(): EntityTableTemplate { return this.config.tableTemplate; }

  /**
   * Entities store
   */
  get entityStore(): EntityStore<Entity> { return this.config.entityStore; }

  /**
   * Actions store (some actions activate a widget)
   */
  get actionStore(): EntityStore<Action> { return this.config.actionStore; }

  /**
   * Selected entity
   */
  get entity(): Entity { return this.entity$.value; }

  /**
   * Selected widget
   */
  get widget(): Widget { return this.widget$.value; }

  /**
   * Whether a widget is selected
   */
  get hasWidget(): boolean { return this.widget !== undefined; }

  constructor(private config: EditorConfig) {
    super();
  }

  /**
   * Whether this editor is active
   */
  isActive(): boolean { return this.active; }

  /**
   * Activate the editor. By doing that, the editor will observe
   * the selected entity (from the store) and update the actions availability.
   * For example, some actions require an entity to be selected.
   */
  activate() {
    if (this.active === true) {
      this.deactivate();
    }
    this.active = true;

    this.entity$$ = this.entityStore
      .observeFirstBy((entity: Entity, state: State) => state.selected === true)
      .pipe(distinctUntilChanged())
      .subscribe((entity: Entity) => this.onSelectEntity(entity));

    this.changes$$ = this.changes$
      .pipe(debounceTime(50))
      .subscribe(() => this.updateActionsAvailability());
    this.changes$.next();
  }

  /**
   * Deactivate the editor. Unsubcribe to the selected entity.
   */
  deactivate() {
    this.active = false;
    this.deactivateWidget();

    if (this.entity$$ !== undefined) {
      this.entity$$.unsubscribe();
    }
    if (this.changes$$ !== undefined) {
      this.changes$$.unsubscribe();
    }
  }

  /**
   * Activate a widget. In itself, activating a widget doesn't render it but,
   * if an EditorOutlet component is bound to this editor, the widget will
   * show up.
   * @param widget Widget
   * @param inputs Inputs the widget will receive
   */
  activateWidget(widget: Widget, inputs: {[key: string]: any} = {}) {
    this.widget$.next(widget);
    this.widgetInputs$.next(inputs);
  }

  /**
   * Deactivate a widget.
   */
  deactivateWidget() {
    this.widget$.next(undefined);
    this.changes$.next();
  }

  /**
   * When an entity is selected, keep a reference to that
   * entity and update the actions availability.
   * @param entity Entity
   */
  private onSelectEntity(entity: Entity) {
    this.entity$.next(entity);
    this.changes$.next();
  }

  /**
   * Update actions availability. That means disabling or enabling some
   * actions based on the conditions they define.
   */
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

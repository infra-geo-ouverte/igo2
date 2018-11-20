import { Entity, EntityClass, EntityTableModel } from '../../entity/shared/entity.interface';
import { EntityStore } from '../../entity/shared/store';
import { Widget } from '../../widget/shared/widget.interface';
import { EditorConfig } from './edition.interface';

export class Editor extends EntityClass {

  get id(): string {
    return this.config.id;
  }

  get title(): string {
    return this.config.title;
  }

  get tableModel(): EntityTableModel {
    return this.config.tableModel;
  }

  get dataStore():  EntityStore<Entity> {
    return this._dataStore;
  }
  private _dataStore: EntityStore<Entity>;

  get widgetStore():  EntityStore<Widget> {
    return this._widgetStore;
  }
  private _widgetStore: EntityStore<Widget>;

  constructor(private config: EditorConfig) {
    super();
  }

  bindDataStore(dataStore: EntityStore<Entity>): Editor {
    this.unbindDataStore();
    this._dataStore = dataStore;

    return this;
  }

  unbindDataStore(): Editor {
    this._dataStore = undefined;

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
}

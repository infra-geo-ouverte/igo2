import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit
} from '@angular/core';

import { Subject } from 'rxjs';

import {
  EntityStore,
  EntityFormTemplate,
  EntityTransaction,
  getEntityRevision
} from 'src/lib/entity';
import { IgoMap } from 'src/lib/map';
import { WidgetComponent } from 'src/lib/widget';

import { ClientSchema } from '../../schema/shared/client-schema.interfaces';
import { ClientSchemaElementSurface } from '../shared/client-schema-element.interfaces';
import { ClientSchemaElementFormService } from '../shared/client-schema-element-form.service';

@Component({
  selector: 'fadq-client-schema-element-surface-update-form',
  templateUrl: './client-schema-element-surface-update-form.component.html',
  styleUrls: ['./client-schema-element-surface-update-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientSchemaElementSurfaceUpdateFormComponent implements WidgetComponent, OnInit {

  public template$ = new Subject<EntityFormTemplate>();

  @Input()
  get map(): IgoMap {
    return this._map;
  }
  set map(value: IgoMap) {
    this._map = value;
  }
  private _map: IgoMap;

  @Input()
  get schema(): ClientSchema {
    return this._schema;
  }
  set schema(value: ClientSchema) {
    if (this.schema !== undefined) {
      return;
    }
    this._schema = value;
    this.cdRef.detectChanges();
  }
  private _schema: ClientSchema;

  @Input()
  get element(): ClientSchemaElementSurface {
    return this._element;
  }
  set element(value: ClientSchemaElementSurface) {
    this._element = value;
    this.cdRef.detectChanges();
  }
  private _element: ClientSchemaElementSurface;

  @Input()
  get store(): EntityStore<ClientSchemaElementSurface> {
    return this._store;
  }
  set store(value: EntityStore<ClientSchemaElementSurface>) {
    this._store = value;
  }
  private _store;

  @Input()
  get transaction(): EntityTransaction {
    return this._transaction;
  }
  set transaction(value: EntityTransaction) {
    this._transaction = value;
  }
  private _transaction;

  @Output() complete = new EventEmitter<ClientSchemaElementSurface>();
  @Output() cancel = new EventEmitter();

  constructor(
    private clientSchemaElementFormService: ClientSchemaElementFormService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // TODO: Should we make the original feature invisible?
    // TODO: Should we unselect it? On the map only?
    // TODO: Should we disable the select interaction(s)?
    this.clientSchemaElementFormService.buildUpdateSurfaceForm(this.map)
      .subscribe((template: EntityFormTemplate) => this.template$.next(template));
  }

  onSubmit(event: {entity: undefined, data: { [key: string]: any }}) {
    const element = this.parseData(event.data);
    this.onSubmitSuccess(element);
  }

  onCancel() {
    this.cancel.emit();
  }

  private onSubmitSuccess(element: ClientSchemaElementSurface) {
    this.transaction.update(this.element, element, this.store);
    this.complete.emit();
  }

  private parseData(data: { [key: string]: any }): ClientSchemaElementSurface {
    const properties = Object.assign({}, this.element.properties);
    const propertyPrefix = 'properties.';
    Object.entries(data).forEach((entry: [string, any]) => {
      const [key, value] = entry;
      if (key.startsWith(propertyPrefix)) {
        const property = key.substr(propertyPrefix.length);
        properties[property] = value;
      }
    });

    const revision = getEntityRevision(this.element) + 1;
    const meta = Object.assign({}, this.element.meta, {
      title: `Surface - ${properties.typeElement} - ${properties.description}`,
      revision
    });

   return Object.assign({}, this.element, {
      meta,
      properties,
      geometry: data.geometry
    });
  }

}

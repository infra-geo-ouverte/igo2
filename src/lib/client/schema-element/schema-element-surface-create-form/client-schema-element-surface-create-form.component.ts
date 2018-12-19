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

import { uuid } from '@igo2/utils';

import { EntityStore, EntityFormTemplate, EntityTransaction, getEntityId } from 'src/lib/entity';
import { FEATURE } from 'src/lib/feature';
import { IgoMap } from 'src/lib/map';
import { WidgetComponent } from 'src/lib/widget';

import { ClientSchema } from '../../schema/shared/client-schema.interfaces';
import { ClientSchemaElementSurface, ClientSchemaElementProperties } from '../shared/client-schema-element.interfaces';
import { ClientSchemaElementFormService } from '../shared/client-schema-element-form.service';

@Component({
  selector: 'fadq-client-schema-element-surface-create-form',
  templateUrl: './client-schema-element-surface-create-form.component.html',
  styleUrls: ['./client-schema-element-surface-create-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientSchemaElementSurfaceCreateFormComponent implements WidgetComponent, OnInit {

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
    // TODO: maybe widgets should have a bindData method that
    // would handle that
    this.cdRef.detectChanges();
  }
  private _schema: ClientSchema;

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
    this.clientSchemaElementFormService.buildCreateSurfaceForm(this.map)
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
    this.transaction.insert(element, this.store);
    this.complete.emit();
  }

  private parseData(data: { [key: string]: any }): ClientSchemaElementSurface {
    const properties = {
      idSchema: getEntityId(this.schema),
      idElementGeometrique: undefined,
      typeElement: undefined,
      descriptionTypeElement: undefined,
      etiquette: undefined,
      description: undefined,
      anneeImage: undefined,
      timbreMaj: undefined,
      usagerMaj: undefined
    };

    const propertyPrefix = 'properties.';
    Object.entries(data).forEach((entry: [string, any]) => {
      const [key, value] = entry;
      if (key.startsWith(propertyPrefix)) {
        const property = key.substr(propertyPrefix.length);
        properties[property] = value;
      }
    });

    return {
      meta: {
        id: uuid(),
        title: `Surface - ${properties.typeElement} - ${properties.description}`
      },
      type: FEATURE,
      geometry: data.geometry,
      projection: 'EPSG:4326',
      properties: properties as ClientSchemaElementProperties
    };
  }

}

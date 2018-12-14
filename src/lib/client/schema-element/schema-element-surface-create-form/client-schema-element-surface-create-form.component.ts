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

import { EntityStore, EntityFormTemplate, getEntityId } from 'src/lib/entity';
import { IgoMap } from 'src/lib/map';
import { WidgetComponent } from 'src/lib/widget';

import { ClientSchema } from '../../schema/shared/client-schema.interfaces';
import {
  ClientSchemaElementSurface,
  ClientSchemaElementSurfaceCreateData
} from '../shared/client-schema-element.interfaces';
import { ClientSchemaElementSurfaceService } from '../shared/client-schema-element-surface.service';
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
  }
  private _element;

  @Input()
  get store(): EntityStore<ClientSchemaElementSurface> {
    return this._store;
  }
  set store(value: EntityStore<ClientSchemaElementSurface>) {
    this._store = value;
  }
  private _store;

  @Output() complete = new EventEmitter<ClientSchemaElementSurface>();
  @Output() cancel = new EventEmitter();

  constructor(
    private clientSchemaElementSurfaceService: ClientSchemaElementSurfaceService,
    private clientSchemaElementFormService: ClientSchemaElementFormService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.clientSchemaElementFormService.buildCreateSurfaceForm(this.map)
      .subscribe((template: EntityFormTemplate) => this.template$.next(template));
  }

  onSubmit(event: {entity: undefined, data: { [key: string]: any }}) {
    console.log(event.data);
    const properties = Object.assign({
      idSchema: getEntityId(this.schema)
    }, event.data);
    // const feature = Object.create({properties}) as ClientSchemaElementSurfaceCreateData;
    // this.clientSchemaElementSurfaceService.create(data)
    //   .subscribe((element: ClientSchemElementSurface) => this.onSubmitSuccess(element));
  }

  onCancel() {
    this.cancel.emit();
  }

  private onSubmitSuccess(element: ClientSchemaElementSurface) {
    if (this.store !== undefined) {
      this.store.addEntities([element], true);
    }
    this.complete.emit();
  }

}

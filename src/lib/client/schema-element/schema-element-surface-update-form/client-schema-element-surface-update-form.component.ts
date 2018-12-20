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

import { EntityFormTemplate, EntityTransaction, getEntityId } from 'src/lib/entity';
import { Feature, FeatureStore } from 'src/lib/feature';
import { IgoMap } from 'src/lib/map';
import { WidgetComponent } from 'src/lib/widget';

import { ClientSchema } from '../../schema/shared/client-schema.interfaces';
import { ClientSchemaElementSurface } from '../shared/client-schema-element.interfaces';
import { ClientSchemaElementFormService } from '../shared/client-schema-element-form.service';

import { generateOperationTitle } from '../shared/client-schema-element.utils';

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
    // TODO: maybe widgets should have a bindData method that
    // would handle that
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
  get store(): FeatureStore<ClientSchemaElementSurface> {
    return this._store;
  }
  set store(value: FeatureStore<ClientSchemaElementSurface>) {
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
    this.clientSchemaElementFormService.buildUpdateSurfaceForm(this.map)
      .subscribe((template: EntityFormTemplate) => this.template$.next(template));
  }

  onSubmit(event: {feature: undefined, data: Feature}) {
    const element = this.formDataToElement(event.data);
    this.onSubmitSuccess(element);
  }

  onCancel() {
    this.cancel.emit();
  }

  private onSubmitSuccess(element: ClientSchemaElementSurface) {
    this.transaction.update(this.element, element, this.store, {
      title: generateOperationTitle(element)
    });
    this.complete.emit();
  }

  private formDataToElement(data: Feature): ClientSchemaElementSurface {
    return Object.assign({}, data as ClientSchemaElementSurface);
  }

}

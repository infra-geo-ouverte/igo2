import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit
} from '@angular/core';

import { Subject } from 'rxjs';

import { EntityTransaction, getEntityId } from 'src/lib/entity';
import { Feature, FeatureStore, FeatureFormSubmitEvent } from 'src/lib/feature';
import { IgoMap } from 'src/lib/map';
import { WidgetComponent } from 'src/lib/widget';
import { Form } from 'src/lib/form';

import { ClientSchema } from '../../schema/shared/client-schema.interfaces';
import { ClientSchemaElementSurface } from '../shared/client-schema-element.interfaces';
import { ClientSchemaElementFormService } from '../shared/client-schema-element-form.service';

import { generateOperationTitle } from '../shared/client-schema-element.utils';

@Component({
  selector: 'fadq-client-schema-element-surface-create-form',
  templateUrl: './client-schema-element-surface-create-form.component.html',
  styleUrls: ['./client-schema-element-surface-create-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientSchemaElementSurfaceCreateFormComponent extends WidgetComponent implements OnInit {

  public form$ = new Subject<Form>();

  @Input() map: IgoMap;

  @Input() store: FeatureStore<ClientSchemaElementSurface>;

  @Input() transaction: EntityTransaction;

  @Input()
  set schema(value: ClientSchema) {
    if (this.schema !== undefined) {
      return;
    }
    this._schema = value;
    // TODO: maybe widgets should have a bindData method that
    // would handle that
    this.cdRef.detectChanges();
  }
  get schema(): ClientSchema { return this._schema; }
  private _schema: ClientSchema;

  constructor(
    private clientSchemaElementFormService: ClientSchemaElementFormService,
    private cdRef: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {
    this.clientSchemaElementFormService.buildCreateSurfaceForm(this.map)
      .subscribe((form: Form) => this.form$.next(form));
  }

  onSubmit(data: Feature) {
    this.onSubmitSuccess(this.formDataToElement(data));
  }

  onCancel() {
    this.cancel.emit();
  }

  private onSubmitSuccess(element: ClientSchemaElementSurface) {
    this.transaction.insert(element, this.store, {
      title: generateOperationTitle(element)
    });
    this.complete.emit();
  }

  private formDataToElement(data: Feature): ClientSchemaElementSurface {
    const properties = Object.assign({
      idSchema: getEntityId(this.schema),
      idElementGeometrique: undefined,
      typeElement: undefined,
      descriptionTypeElement: undefined,
      etiquette: undefined,
      description: undefined,
      anneeImage: undefined,
      timbreMaj: undefined,
      usagerMaj: undefined
    }, data.properties);

    return Object.assign({}, data, {properties});
  }

}

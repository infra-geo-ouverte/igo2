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

import { EntityTransaction, Form, WidgetComponent, OnUpdateInputs } from '@igo2/common';
import { Feature, FeatureStore, IgoMap } from '@igo2/geo';

import { ClientSchema } from '../../schema/shared/client-schema.interfaces';
import { ClientSchemaElement } from '../shared/client-schema-element.interfaces';
import { ClientSchemaElementFormService } from '../shared/client-schema-element-form.service';

import { generateOperationTitle } from '../shared/client-schema-element.utils';

@Component({
  selector: 'fadq-client-schema-element-create-form',
  templateUrl: './client-schema-element-create-form.component.html',
  styleUrls: ['./client-schema-element-create-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientSchemaElementCreateFormComponent implements OnInit, OnUpdateInputs, WidgetComponent {

  /**
   * Create form
   */
  public form$ = new Subject<Form>();

  /**
   * Map to draw elements on
   */
  @Input() map: IgoMap;

  /**
   * Schema element store
   */
  @Input() store: FeatureStore<ClientSchemaElement>;

  /**
   * Schema element transaction
   */
  @Input() transaction: EntityTransaction;

  /**
   * Schema
   */
  @Input() schema: ClientSchema;

  /**
   * Event emitted on complete
   */
  @Output() complete = new EventEmitter<void>();

  /**
   * Event emitted on cancel
   */
  @Output() cancel = new EventEmitter<void>();

  constructor(
    private clientSchemaElementFormService: ClientSchemaElementFormService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.clientSchemaElementFormService.buildUpdateForm(this.map)
      .subscribe((form: Form) => this.form$.next(form));
  }

  /**
   * Implemented as part of OnUpdateInputs
   */
  onUpdateInputs() {
    this.cdRef.detectChanges();
  }

  onSubmit(data: Feature) {
    this.onSubmitSuccess(this.formDataToElement(data));
  }

  onCancel() {
    this.cancel.emit();
  }

  private onSubmitSuccess(element: ClientSchemaElement) {
    this.transaction.insert(element, this.store, {
      title: generateOperationTitle(element)
    });
    this.complete.emit();
  }

  private formDataToElement(data: Feature): ClientSchemaElement {
    const properties = Object.assign({
      idSchema: this.schema.id,
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

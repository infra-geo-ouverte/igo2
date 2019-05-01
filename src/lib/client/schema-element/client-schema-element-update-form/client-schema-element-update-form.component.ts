import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit
} from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import {
  EntityTransaction,
  Form,
  FormField,
  FormFieldSelectInputs,
  WidgetComponent,
  OnUpdateInputs,
  FormFieldSelectChoice
} from '@igo2/common';
import { Feature, FeatureStore, IgoMap } from '@igo2/geo';

import { ClientSchema } from '../../schema/shared/client-schema.interfaces';
import {
  ClientSchemaElement,
  ClientSchemaElementTypes
} from '../shared/client-schema-element.interfaces';
import { ClientSchemaElementService } from '../shared/client-schema-element.service';
import { ClientSchemaElementFormService } from '../shared/client-schema-element-form.service';
import { generateOperationTitle, computeSchemaElementArea } from '../shared/client-schema-element.utils';

@Component({
  selector: 'fadq-client-schema-element-update-form',
  templateUrl: './client-schema-element-update-form.component.html',
  styleUrls: ['./client-schema-element-update-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientSchemaElementUpdateFormComponent implements OnInit, OnUpdateInputs, WidgetComponent {

  /**
   * Update form
   * @internal
   */
  public form$ = new BehaviorSubject<Form>(undefined);

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
   * Schema element
   */
  @Input() element: ClientSchemaElement;

  /**
   * Event emitted on complete
   */
  @Output() complete = new EventEmitter<void>();

  /**
   * Event emitted on cancel
   */
  @Output() cancel = new EventEmitter<void>();

  constructor(
    private clientSchemaElementService: ClientSchemaElementService,
    private clientSchemaElementFormService: ClientSchemaElementFormService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    console.log(this.element);
    this.clientSchemaElementFormService
      .buildUpdateForm(this.map, [this.element.geometry.type])
      .subscribe((form: Form) => this.setForm(form));
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
    this.transaction.update(this.element, element, this.store, {
      title: generateOperationTitle(element)
    });
    this.complete.emit();
  }

  private formDataToElement(data: Feature): ClientSchemaElement {
    const element = Object.assign({}, data as ClientSchemaElement);
    const typeDescription = this.clientSchemaElementService
      .getSchemaElementTypeDescription(element.properties.typeElement);
    element.properties.superficie = computeSchemaElementArea(element);
    element.properties.descriptionTypeElement = typeDescription;
    return element;
  }

  private setForm(form: Form) {
    this.clientSchemaElementService
      .getSchemaElementTypes(this.schema.type)
      .subscribe((elementTypes: ClientSchemaElementTypes) => {
        const geometryType = this.element.geometry.type;
        const elementTypeField = form.groups[0].fields.find((field: FormField) => {
          return field.name === 'properties.typeElement';
        }) as FormField<FormFieldSelectInputs>;

        const choices$ = elementTypeField.inputs.choices as BehaviorSubject<FormFieldSelectChoice[]>;
        choices$.next(elementTypes[geometryType]);
        this.form$.next(form);
      });
  }

}

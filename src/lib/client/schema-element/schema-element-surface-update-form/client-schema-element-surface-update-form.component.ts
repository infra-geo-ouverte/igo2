import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { Subject } from 'rxjs';

import { EntityTransaction } from 'src/lib/entity';
import { Feature, FeatureStore } from 'src/lib/feature';
import { IgoMap } from 'src/lib/map';
import { WidgetComponent } from 'src/lib/widget';
import { Form } from 'src/lib/form';

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
export class ClientSchemaElementSurfaceUpdateFormComponent
    extends WidgetComponent implements OnInit {

  public form$ = new Subject<Form>();

  @Input() map: IgoMap;

  @Input() schema: ClientSchema;

  @Input() store: FeatureStore<ClientSchemaElementSurface>;

  @Input() transaction: EntityTransaction;

  @Input()
  set element(value: ClientSchemaElementSurface) {
    this._element = value;
    this.cdRef.detectChanges();
  }
  get element(): ClientSchemaElementSurface { return this._element; }
  private _element: ClientSchemaElementSurface;

  constructor(
    private clientSchemaElementFormService: ClientSchemaElementFormService,
    private formBuilder: FormBuilder,
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
    this.transaction.update(this.element, element, this.store, {
      title: generateOperationTitle(element)
    });
    this.complete.emit();
  }

  private formDataToElement(data: Feature): ClientSchemaElementSurface {
    return Object.assign({}, data as ClientSchemaElementSurface);
  }

}

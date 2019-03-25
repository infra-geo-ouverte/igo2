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

import { EntityStore, Form, WidgetComponent, OnUpdateInputs } from '@igo2/common';
import { LanguageService } from '@igo2/core';

import { ClientSchema } from '../shared/client-schema.interfaces';
import { ClientSchemaService } from '../shared/client-schema.service';
import { ClientSchemaFormService } from '../shared/client-schema-form.service';

@Component({
  selector: 'fadq-client-schema-transfer-form',
  templateUrl: './client-schema-transfer-form.component.html',
  styleUrls: ['./client-schema-transfer-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientSchemaTransferFormComponent implements OnInit, OnUpdateInputs, WidgetComponent {

  /**
   * Transfer form
   * @internal
   */
  public form$: Subject<Form> = new Subject<Form>();

  /**
   * Slice error, if any
   * @internal
   */
  errorMessage$: Subject<string> = new Subject();

  /**
   * Schema store
   */
  @Input() store: EntityStore<ClientSchema>;

  /**
   * Schema to update
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
    private clientSchemaService: ClientSchemaService,
    private clientSchemaFormService: ClientSchemaFormService,
    private languageService: LanguageService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.clientSchemaFormService.buildTransferForm()
      .subscribe((form: Form) => this.form$.next(form));
  }

  /**
   * Implemented as part of OnUpdateInputs
   */
  onUpdateInputs() {
    this.cdRef.detectChanges();
  }

  /**
   * On submit, transfer the schema to a new client.
   * @param data Schema data
   */
  onSubmit(data: {[key: string]: any}) {
    this.clientSchemaService.transferSchema(this.schema, data.numeroClient)
      .subscribe((code: string) => {
        if (code === '0') {
          this.onSubmitSuccess();
        } else {
          this.onSubmitError();
        }
      });
  }

  /**
   * Emit cancel event
   */
  onCancel() {
    this.cancel.emit();
  }

  /**
   * On submit success, delete the schema from the store (since it doesn't belong)
   * to the current client anymore.
   */
  private onSubmitSuccess() {
    this.errorMessage$.next(undefined);
    this.store.delete(this.schema);
    this.complete.emit();
  }

  /**
   * On submit error, display an error message
   */
  private onSubmitError() {
    // TODO: Add an OK button after that? Or should that be in a dialog?
    const errorMessageKey = 'client.schema.tooltip.error.duplicatedNumbers';
    this.errorMessage$.next(this.languageService.translate.instant(errorMessageKey));
  }

}

import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';

import { EntityStore } from 'src/lib/entity';
import { WidgetComponent } from 'src/lib/widget';

import { ClientSchema } from '../shared/client-schema.interfaces';
import { ClientSchemaService } from '../shared/client-schema.service';

@Component({
  selector: 'fadq-client-schema-delete-form',
  templateUrl: './client-schema-delete-form.component.html',
  styleUrls: ['./client-schema-delete-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientSchemaDeleteFormComponent implements WidgetComponent {

  /**
   * Schema store
   */
  @Input() store: EntityStore<ClientSchema>;

  /**
   * Schema to delete
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
    private cdRef: ChangeDetectorRef
  ) {}

  /**
   * Implemented as part of WidgetComponent
   */
  onUpdateInputs() {
    this.cdRef.detectChanges();
  }

  onSubmit() {
    this.clientSchemaService.deleteSchema(this.schema)
      .subscribe(() => this.onSubmitSuccess());
  }

  onCancel() {
    this.cancel.emit();
  }

  private onSubmitSuccess() {
    this.store.removeEntities([this.schema]);
    this.complete.emit();
  }

}

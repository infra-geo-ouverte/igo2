import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

import {  EntityStore } from '@igo2/common';

import { ClientSchema } from '../shared/client-schema.interfaces';
import { getClientSchemaTitle } from '../shared/client-schema.utils';

@Component({
  selector: 'fadq-client-schema-selector',
  templateUrl: './client-schema-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientSchemaSelectorComponent {

  @Input() store: EntityStore<ClientSchema>;

  @Output() selectedChange = new EventEmitter<{
    selected: boolean;
    entity: ClientSchema;
  }>();

  getSchemaTitle(schema: ClientSchema): string {
    return getClientSchemaTitle(schema);
  }

}

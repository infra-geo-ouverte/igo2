import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

import { EntityStore } from '@igo2/common';

import { ClientParcelYear } from '../shared/client-parcel.interfaces';

@Component({
  selector: 'fadq-client-parcel-year-selector',
  templateUrl: './client-parcel-year-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientParcelYearSelectorComponent {

  @Input() store: EntityStore<ClientParcelYear>;

  @Output() selectedChange = new EventEmitter<{
    selected: boolean;
    entity: ClientParcelYear;
  }>();

  getParcelYearTitle(parcelYear: ClientParcelYear): string {
    return '' + parcelYear.annee;
  }
}

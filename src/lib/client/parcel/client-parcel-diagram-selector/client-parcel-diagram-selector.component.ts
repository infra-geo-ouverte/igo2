import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

import { EntityStore } from '@igo2/common';

import { ClientParcelDiagram } from '../shared/client-parcel.interfaces';

@Component({
  selector: 'fadq-client-parcel-diagram-selector',
  templateUrl: './client-parcel-diagram-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientParcelDiagramSelectorComponent {

  @Input() store: EntityStore<ClientParcelDiagram>;

  @Output() selectedChange = new EventEmitter<{
    selected: boolean;
    entity: ClientParcelDiagram;
  }>();

  getDiagramId(diagram: ClientParcelDiagram): number {
    return diagram.id;
  }

}

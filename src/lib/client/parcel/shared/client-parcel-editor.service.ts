import { Injectable} from '@angular/core';

import { Editor } from 'src/lib/edition';
import { EntityStore } from 'src/lib/entity';
import { Widget } from 'src/lib/widget';

import { ClientParcel } from './client-parcel.interfaces';
import { ClientParcelTableService } from './client-parcel-table.service';

@Injectable({
  providedIn: 'root'
})
export class ClientParcelEditorService extends Editor {

  constructor(private clientParcelTableService: ClientParcelTableService) {
    super({
      id: 'fadq.client-parcel-editor',
      title: 'Parcelles du client',
      tableTemplate: clientParcelTableService.buildTable()
    });

    this.bindEntityStore(new EntityStore<ClientParcel>());
    this.bindWidgetStore(new EntityStore<Widget>());
  }
}

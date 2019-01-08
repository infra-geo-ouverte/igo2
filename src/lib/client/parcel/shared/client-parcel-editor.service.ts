import { Injectable} from '@angular/core';

import { Action } from 'src/lib/action';
import { Editor } from 'src/lib/edition';
import { EntityStore } from 'src/lib/entity';
import { FeatureStore } from 'src/lib/feature';

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
      tableTemplate: clientParcelTableService.buildTable(),
      entityStore: new FeatureStore<ClientParcel>(),
      actionStore: new EntityStore<Action>()
    });
  }
}

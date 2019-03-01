import { Injectable} from '@angular/core';

import { Action, EntityStore } from '@igo2/common';
import { FeatureStore } from '@igo2/geo';
import { MapState } from '@igo2/integration';

import { Editor } from 'src/lib/edition';
import { ClientParcel, ClientParcelTableService } from 'src/lib/client';

@Injectable()
export class ClientParcelEditor extends Editor {

  constructor(
    private mapState: MapState,
    private clientParcelTableService: ClientParcelTableService
  ) {
    super({
      id: 'fadq.client-parcel-editor',
      title: 'Parcelles du client',
      tableTemplate: clientParcelTableService.buildTable(),
      entityStore: new FeatureStore<ClientParcel>([], {
        getKey: (entity: ClientParcel) => entity.properties.id,
        map: mapState.map
      }),
      actionStore: new EntityStore<Action>([])
    });
  }
}

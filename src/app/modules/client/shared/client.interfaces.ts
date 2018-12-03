import { EntityObject } from 'src/app/modules/entity';

import { ClientInfo, ClientInfoApiConfig } from '../info';
import { ClientParcel, ClientParcelDiagram, ClientParcelApiConfig } from '../parcel';
import { ClientSchema, ClientSchemaApiConfig } from '../schema';

export interface ClientApiConfig {
  info: ClientInfoApiConfig;
  parcel: ClientParcelApiConfig;
  schema: ClientSchemaApiConfig;
}

export interface Client extends EntityObject {
  info: ClientInfo;
  parcels: ClientParcel[];
  schemas: ClientSchema[];
  diagrams: ClientParcelDiagram[];
}

import { EntityObject } from 'src/lib/entity';

import { ClientInfo, ClientInfoApiConfig } from '../info';
import { ClientParcel, ClientParcelDiagram, ClientParcelApiConfig } from '../parcel';
import { ClientSchema, ClientSchemaApiConfig } from '../schema';
import { ClientSchemaFileApiConfig } from '../schema-file';
import { ClientSchemaElementApiConfig } from '../schema-element';

export interface ClientApiConfig {
  info: ClientInfoApiConfig;
  parcel: ClientParcelApiConfig;
  schema: ClientSchemaApiConfig;
  schemaFile: ClientSchemaFileApiConfig;
  schemaElement: ClientSchemaElementApiConfig;
}

export interface Client extends EntityObject {
  info: ClientInfo;
  parcels: ClientParcel[];
  schemas: ClientSchema[];
  diagrams: ClientParcelDiagram[];
}

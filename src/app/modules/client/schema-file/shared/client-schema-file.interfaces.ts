import { EntityObject } from 'src/app/modules/entity';

export interface ClientSchemaFileApiConfig  {
  list: string;
  get: string;
  create: string;
  delete: string;
}

// Property have been renamed because this might become a common interface/module
export interface ClientSchemaFile extends EntityObject {
  id: string;
  name: string;
  address: string;
  size?: number;
  type?: string;
}

export interface ClientSchemaFileListResponse {
  data?: ClientSchemaFileListResponseItem[];
}

export interface ClientSchemaFileListResponseItem {
  idDocumentSchema: string;
  nomPhysiqueDocument: string;
  addresseDocument: string;
  tailleDocument: number;
  typeDocument: string;
}

export interface ClientSchemaFileGetResponse extends ClientSchemaFileListResponseItem {
  document: string;
}

export interface ClientSchemaFileCreateData {
  nomPhysiqueDocument: string;
  tailleDocument: number;
  typeDocument: string;
  document: string;
  idSchema: number;
}

export interface ClientSchemaFileCreateResponse extends ClientSchemaFileListResponseItem {}

export interface ClientSchemaTypeChoicesResponse {
  data: ClientSchemaTypeChoicesResponseItem[];
}

export interface ClientSchemaTypeChoicesResponseItem {
  code: string;
  descriptionAbregeeFrancais: string;
  descriptionFrancais: string;
  descriptionAbregeeAnglais: string;
  descriptionAnglaiss: string;
  ordreAffichage: number;
}

import { EntityObject } from 'src/app/modules/entity';

export interface ClientSchemaApiConfig  {
  list: string;
  create: string;
  update: string;
  delete: string;
  duplicate: string;
}

export interface ClientSchema extends EntityObject {
  id: string;
  numeroClient: string;
  type: string;
  description: string;
  annee: string;
  etat: string;
}

export interface ClientSchemaListResponse {
  donnees?: ClientSchemaListResponseItem[];
}

export interface ClientSchemaListResponseItem extends ClientSchema {}

export interface ClientSchemaCreateData {
  numeroClient: string;
  type: string;
  description: string;
  annee: string;
  etat: string;
}

export interface ClientSchemaCreateResponse extends ClientSchema {}

export interface ClientSchemaUpdateData {
  id: number;
  type: string;
  description: string;
  annee: string;
  etat: string;
}

export interface ClientSchemaUpdateResponse extends ClientSchema {}

export interface ClientSchemaDuplicateResponse extends ClientSchema {}

/*** Files ***/
export interface ClientSchemaFileApiConfig  {
  list: string;
  create: string;
  delete: string;
}

export interface ClientSchemaFile extends EntityObject {
  id: string;
  name: string;
  address: string;
  size?: number;
  type?: string;
}

export interface ClientSchemaFileListResponse {
  donnees?: ClientSchemaFileListResponseItem[];
}

export interface ClientSchemaFileListResponseItem {
  idDocumentSchema: string;
  nomPhysiqueDocument: string;
  addresseDocument: string;
  tailleDocument: number;
  typeDocument: string;
}

export interface ClientSchemaFileCreateData {
  nomPhysiqueDocument: string;
  tailleDocument: number;
  typeDocument: string;
  document: string | ArrayBuffer;
  idSchema: number;
}

export interface ClientSchemaFileCreateResponse extends ClientSchemaFileListResponseItem {}

import { EntityObject } from 'src/app/modules/entity';

export interface ClientSchemaApiConfig  {
  list: string;
  create: string;
  update: string;
  delete: string;
  duplicate: string;
  domains: {
    type: string;
  };
}

export interface ClientSchema extends EntityObject {
  id: string;
  numeroClient: string;
  type: string;
  description: string;
  annee: string;
  etat: string;
  nbDocuments: number;
  usagerMaj: string;
  timbreMaj: string;
}

export interface ClientSchemaListResponse {
  data?: ClientSchemaListResponseItem[];
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

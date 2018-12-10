import { EntityObject } from 'src/lib/entity';

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

export interface ClientSchemaCreateResponse {
  data: ClientSchema;
}

export interface ClientSchemaUpdateData {
  id: number;
  type: string;
  description: string;
  annee: string;
  etat: string;
}

export interface ClientSchemaUpdateResponse {
  data: ClientSchema;
}

export interface ClientSchemaDuplicateResponse {
  data: ClientSchema;
}

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

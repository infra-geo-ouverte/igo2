import { EntityObject } from 'src/app/modules/entity';

export interface ClientSchemaApiConfig  {
  list: string;
  create: string;
  update: string;
  delete: string;
  copy: string;
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

export type ClientSchemaUpdateResponse = ClientSchema;

export interface ClientSchemaUpdateData {
  id: number;
  type: string;
  description: string;
  annee: string;
  etat: string;
}

export type ClientSchemaCreateResponse = ClientSchema;

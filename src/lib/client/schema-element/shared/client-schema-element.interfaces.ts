import { Feature } from '@igo2/geo';

export interface ClientSchemaElementApiConfig {
  save: string;
  points: string;
  lines: string;
  surfaces: string;
  domains: {
    type: string;
  };
}

export interface ClientSchemaElementProperties {
  idElementGeometrique: string;
  etiquette: string;
  description: string;
  typeElement: string;
  descriptionTypeElement: string;
  anneeImage: number;
  timbreMaj: string;
  usagerMaj: string;
}

export interface ClientSchemaElement extends Feature {
  properties: ClientSchemaElementProperties;
}

export interface ClientSchemaElementListResponseItem extends ClientSchemaElement {}

export type ClientSchemaElementListResponse = ClientSchemaElementListResponseItem[];

export interface ClientSchemaElementTypeChoicesResponse {
  data: {
    lstTypeElementPoint: ClientSchemaElementTypeChoicesResponseItem[];
    lstTypeElementLigne: ClientSchemaElementTypeChoicesResponseItem[];
    lstTypeElementSurface: ClientSchemaElementTypeChoicesResponseItem[];
  };
}

export interface ClientSchemaElementTypeChoicesResponseItem {
  idTypeElement: string;
  libelleFrancaisAbr: string;
  libelleFrancais?: string;
  libelleAnglaisAbr?: string;
  libelleAnglais?: string;
  ordreAffichage?: number;
  couleurElement?: string;
  iconeElement?: string;
}

export interface ClientSchemaElementTransactionData {
  inserts:  ClientSchemaElement[];
  updates:  ClientSchemaElement[];
  deletes: string[];
}

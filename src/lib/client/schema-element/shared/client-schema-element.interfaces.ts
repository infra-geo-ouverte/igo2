import { Observable } from 'rxjs';

import { FormFieldSelectChoice } from '@igo2/common';
import { Feature } from '@igo2/geo';

import { ClientSchema } from '../../schema/shared/client-schema.interfaces';

export interface ClientSchemaElementApiConfig {
  savePoints: string;
  saveLines: string;
  saveSurfaces: string;
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
  superficie?: number;
}

export interface ClientSchemaElement extends Feature {
  properties: ClientSchemaElementProperties;
}

export interface ClientSchemaElementListResponseItem extends ClientSchemaElement {}

export type ClientSchemaElementListResponse = ClientSchemaElementListResponseItem[];

export interface ClientSchemaElementType extends FormFieldSelectChoice {}

export interface ClientSchemaElementTypes {
  Point: ClientSchemaElementType[];
  LineString: ClientSchemaElementType[];
  Polygon: ClientSchemaElementType[];
}

export interface ClientSchemaElementTypesResponse {
  data: {
    lstTypeElementPoint: ClientSchemaElementTypesResponseItem[];
    lstTypeElementLigne: ClientSchemaElementTypesResponseItem[];
    lstTypeElementSurface: ClientSchemaElementTypesResponseItem[];
  };
}

export interface ClientSchemaElementTypesResponseItem {
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
  lstElementsAjoutes: ClientSchemaElement[];
  lstElementsModifies: ClientSchemaElement[];
  lstIdElementsSupprimes: string[];
}

export interface GetElements {
  getElements(schema: ClientSchema): Observable<ClientSchemaElement[]>;
}

export interface SaveElements {
  saveElements(schema: ClientSchema, data: ClientSchemaElementTransactionData): Observable<any>;
}

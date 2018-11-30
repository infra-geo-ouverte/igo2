import { EntityObject } from 'src/app/modules/entity';
import { Feature } from 'src/app/modules/feature';

export interface ClientApiConfig {
  info: string;
  parcel: {
    list: string;
  };
  parcelYear: {
    list: string;
  };
  schema: {
    list: string;
    create: string;
    update: string;
  };
}

/*** Info  ***/

export interface ClientInfo {
  numero: string;
  nom: string;
  adresseCor: string;
  adresseExp: string;
  adressePro: string;
}

export interface Client extends EntityObject, ClientInfo {
  parcels: ClientParcel[];
  schemas: ClientSchema[];
  diagrams: ClientDiagram[];
  annees: string[];
}

export interface ClientInfoListResponse {
  donnees?: ClientInfoListResponseItem[];
}

export interface ClientInfoListResponseItem {
  numeroClient: string;
  nomClient: string;
  adresseCorrespondance: string;
  suiteAdresseCorrespondance?: string;
  municipaliteAdresseCorrespondance: string;
  provinceAdresseCorrespondance: ClientInfoListResponseItemProvince;
  paysAdresseCorrespondance: ClientInfoListResponseItemPays;
  codePostalAdresseCorrespondance: string;
}

export interface ClientInfoListResponseItemProvince {
  province: string;
  codeProvince: string;
}

export interface ClientInfoListResponseItemPays {
  pays: string;
  codePays: string;
}

/*** Schema ***/
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

/*** Parcel ***/
export interface ClientParcel extends Feature {
  properties: {
    idParcelle: string;
    noParcelleAgricole: string;
    noDiagramme: string;
    codeProduction: string;
    descriptionCodeProduction: string;
    superficie: number;
    superficieHectare: number;
    pourcentageSuperficieMAO: number;
    superficieMAO: number;
    superficieDeclaree: number;
    codeDefaultCultural: string;
    pourcentageDefaultCulture: number;
    noConfirmation: number;
    noClient: string;
    noClientExploitant: string;
    noClientRecherche: string;
    annee: string;
    indicateurParcelleDrainee: string;
  };
}

export interface ClientParcelListResponseItem extends ClientParcel {}

export type ClientParcelListResponse = ClientParcelListResponseItem[];

/*** Parcel Year ***/
export interface ClientParcelYear extends EntityObject {
  id: string;
  annee: number;
  current: boolean;
}

export interface ClientParcelYearListResponseItem {
  idParametre: number;
  annee: number;
  indAnneeActive: boolean;
}

export interface ClientParcelYearListResponse {
  data: ClientParcelYearListResponseItem[];
}

/*** Diagram ***/
export interface ClientDiagram extends EntityObject {
  id: string;
}

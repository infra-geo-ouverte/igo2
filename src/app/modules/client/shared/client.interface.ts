import { EntityObject } from 'src/app/modules/entity';
import { Feature } from 'src/app/modules/feature';

export interface ClientApiConfig {
  info: string;
  parcels: string;
  schemas: string;
}

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
  donnees?: ClientInfoListResult[];
}

export interface ClientInfoListResult {
  numeroClient: string;
  nomClient: string;
  adresseCorrespondance: string;
  suiteAdresseCorrespondance?: string;
  municipaliteAdresseCorrespondance: string;
  provinceAdresseCorrespondance: ClientInfoListResultProvince;
  paysAdresseCorrespondance: ClientInfoListResultPays;
  codePostalAdresseCorrespondance: string;
}

export interface ClientInfoListResultProvince {
  province: string;
  codeProvince: string;
}

export interface ClientInfoListResultPays {
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
  donnees?: ClientSchemaListResult[];
}

export interface ClientSchemaListResult extends ClientSchema {}

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
    annee: string;
    indicateurParcelleDrainee: string;
  };
}

export interface ClientParcelListResult extends ClientParcel {}

export type ClientParcelListResponse = ClientParcelListResult[];

/*** Diagram ***/
export interface ClientDiagram extends EntityObject {
  id: string;
}

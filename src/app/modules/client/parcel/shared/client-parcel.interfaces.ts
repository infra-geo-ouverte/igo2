import { EntityObject } from 'src/app/modules/entity';
import { Feature } from 'src/app/modules/feature';

export interface ClientParcelApiConfig {
  list: string;
  years: string;
}

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

/*** Parcel Diagram ***/
export interface ClientParcelDiagram extends EntityObject {
  id: string;
}

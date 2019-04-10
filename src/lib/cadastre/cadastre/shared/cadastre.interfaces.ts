
import { Feature } from '@igo2/geo';

/**
 * Api config municipality interface
 */
export interface CadastreApiConfig {
  list: string;
  surfaces: string;
}

/**
 * Cadastre interface
 */
export interface Cadastre {
    idCadastreOriginaire: number;
    nomCadastre: string;
    noCadastre: string;
    codeCadastre: string;
    recherche: string;
}

export type CadastreList = Cadastre[];

export interface CadastreName {
  idCadastreOriginaire: number;
  nomCadastre: string;
}

/**
 * Cadastre interface for the service response
 */
export interface CadastreResponseItem extends Cadastre {}

/**
 * List of cadastre response service
 */
export interface CadastreListResponse {
  data: Cadastre[];
}
export interface CadastreFeature extends Feature {
  properties: {
    idCadastreOriginaire: number;
    nomCadastreOriginaire: string;
    noCadastre: string;
    codeCadastre: string;
    recherche: string;
  };
}

export interface CadastreFeatureResponseItem extends CadastreFeature {}

// export type CadastreFeatureListResponse = CadastreFeatureResponseItem[];

export interface CadastreFeatureResponse {
  data: CadastreFeatureResponseItem;
}


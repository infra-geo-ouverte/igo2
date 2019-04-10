
import { Feature } from '@igo2/geo';

/**
 * Api config lot interface
 */
export interface LotApiConfig {
  list: string;
  points: string;
}

/**
 * Lot interface
 */
export interface Lot {
  idLotOriginaire: string;
  noLotOriginaire: string;
  noCadastre: string;
}

/**
 * Lot interface for the service response
 */
export interface LotResponseItem extends Lot {}

/**
 * List of lot response service
 */
export interface LotListResponse {
  data: Lot[];
}

export interface LotUnique {
  idLot: string;
  noLot: string;
  noCadastre: string;
  listeIdLot: string[];
}

export type LotList =  LotResponseItem[];

export type LotUniqueList = LotUnique[];

export interface LotFeature extends Feature {
  properties: {
    idLotOriginaire: number;
    noLotOriginaire: string;
    noCadastre: string;
  };
}

export interface LotFeatureResponseItem extends LotFeature {}

export type LotFeatureList = LotFeatureResponseItem[];

export interface LotFeatureListResponse {
  data: LotFeatureList;
}


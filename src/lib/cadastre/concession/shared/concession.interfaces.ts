
import { Feature } from '@igo2/geo';

/**
 * Api config concession interface
 */
export interface ConcessionApiConfig {
  list: string;
  points: string;
}

/**
 * Concession interface
 */
export interface Concession {
  idDesignationSecondaire: string;
  nomDesignationSecondaire: string;
  noCadastre: string;
}

export interface ConcessionName {
  idDesignationSecondaire: string;
  nomDesignationSecondaire: string;
  noCadastre: string;
}

/**
 * Concession interface for the service response
 */
export interface ConcessionResponseItem extends Concession {}

/**
 * List of concession response service
 */
export interface ConcessionListResponse {
  data: Concession[];
}

export interface ConcessionUnique {
  idConcession: string;
  nomConcession: string;
  noCadastre: string;
  listeIdConcession: string[];
}

export type ConcessionList =  ConcessionResponseItem[];

export type ConcessionUniqueList = ConcessionUnique[];

export interface ConcessionFeature extends Feature {
  properties: {
    idDesignationSecondaire: number;
    nomDesignationSecondaire: string;
    noCadastre: string;
  };
}

export interface ConcessionFeatureResponseItem extends ConcessionFeature {}

export type ConcessionFeatureList = ConcessionFeatureResponseItem[];

export interface ConcessionFeatureListResponse {
  data: ConcessionFeatureList;
}


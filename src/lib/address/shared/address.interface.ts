import { Feature } from '@igo2/geo';

/**
 * Address api config
 */
export interface AddressApiConfig {
  list: string;
  save: string;
}

/**
 * Address feature interface extending Feature
 */
export interface AddressFeature extends Feature {
  properties: {
    idAdresseLocalisee: string;
    noAdresse: number;
    suffixeNoCivique: string;
  };
}


/**
 * Address feature response item
 */
export interface AddressFeatureResponseItem extends AddressFeature {}

/**
 * Address feature list response item
 */
export type AddressFeatureList = AddressFeatureResponseItem[];


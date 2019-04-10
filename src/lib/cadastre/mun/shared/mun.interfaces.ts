
/**
 * Api config municipality interface
 */
export interface MunApiConfig {
  list: string;
}

/**
 * Municipality interface extending feature
 */
export interface Mun {
  codeGeographique: string;
  nomMunicipalite: string;
  designationMunicipalite: string;
  nomRegionAdmAppartenance: string;
}

/**
 * Municipality interface for the service response
 */
export interface MunResponseItem extends Mun {}

/**
 * List of municipality response service
 */
export interface MunListResponse {
  data: Mun[];
}

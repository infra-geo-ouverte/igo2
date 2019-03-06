import { FeatureGeometry } from '@igo2/geo';

export interface ReseauTransportQuebecData {
  type: string;
  recherche: string;
  geometry: FeatureGeometry;
  bbox: [number, number, number, number];
  properties: { [key: string]: any };
}

export interface ReseauTransportQuebecResponse {
  features: ReseauTransportQuebecData[];
}

export interface ReseauTransportQuebecPropertiesAlias {
  name: string;
  alias: string;
}

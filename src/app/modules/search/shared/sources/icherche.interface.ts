import { FeatureGeometry } from '../../../feature/shared/feature.interface';

export interface IChercheData {
  _id: string;
  doc_type: string;
  recherche: string;
  highlight: string;
  geometry: FeatureGeometry;
  bbox: [number, number, number, number];
  properties: { [key: string]: any };
}

export interface IChercheResponse {
  features: IChercheData[];
}

export interface IChercheReverseData {
  _id: string;
  doc_type: string;
  recherche: string;
  highlight: string;
  geometry: FeatureGeometry;
  bbox: [number, number, number, number];
  properties: { [key: string]: any };
}

export interface IChercheReverseResponse {
  features: IChercheData[];
}

import { FeatureGeometry } from 'src/app/modules/feature';

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

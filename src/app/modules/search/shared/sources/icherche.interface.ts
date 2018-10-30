import { FeatureGeometry } from '../../../feature/shared/feature.interface';

export interface IChercheResult {
  _id: string;
  doc_type: string;
  recherche: string;
  highlight: string;
  geometry: FeatureGeometry;
  bbox: [number, number, number, number];
  properties: { [key: string]: any };
}

export interface IChercheResponse {
  features: IChercheResult[];
}

import { Feature } from '../../../feature/shared/feature.interface';
import { Record } from '../../../data/shared/data.interface';

export interface NominatimResult {
  place_id: string;
  display_name: string;
  osm_type: string;
  class: string;
  type: string;
  lon: string;
  lat: string;
  boundingbox: [string, string, string, string];
}

export interface NominatimRecord extends Record {
  data: Feature;
}

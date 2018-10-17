import { Poi } from '@igo2/context';
import { PlaceCategory } from '../../navigation/shared/place.interface';

export interface NavigationToolOptions {
  categories: PlaceCategory[];
  pois: Poi[];
}

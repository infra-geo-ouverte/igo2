import { Poi } from '@igo2/context';

import { PlaceCategory } from 'src/lib/navigation';

export interface NavigationToolOptions {
  categories: PlaceCategory[];
  pois: Poi[];
}

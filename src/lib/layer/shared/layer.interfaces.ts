import * as olstyle from 'ol/style';

import { FeatureMotion } from 'src/lib/feature';

export interface LayerStoreSelectStrategyOptions {
  motion?: FeatureMotion;
  style?: olstyle.Style;
}

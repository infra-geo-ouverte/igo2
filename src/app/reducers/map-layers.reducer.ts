import { LayerOptions } from '../map/shared/layers/layer';

export function mapLayers(state: Array<LayerOptions> = [], {type, payload}) {
  switch (type) {
    case 'SET_LAYERS':
      return payload;
    default:
      return state;
  }
};

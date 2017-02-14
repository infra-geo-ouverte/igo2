import { LayerOptions } from '../map/shared/layers/layer';

export const mapLayers = (state: Array<LayerOptions> = [], {type, payload}) => {
  switch (type) {
    case 'UPDATE_LAYERS':
      return payload;
    default:
      return state;
  }
};

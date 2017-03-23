import { LayerOptions } from '../../map/shared/layers';

export function layers(state: Array<LayerOptions> = [], {type, payload}) {
  switch (type) {
    case 'SET_LAYERS':
      return payload.map((options: LayerOptions, index: number) =>
        Object.assign({zIndex: index}, options));
    default:
      return state;
  }
};

import { LayerOptions } from '../../map/shared/layers/layer';

export function editedLayer (state: LayerOptions = null, {type, payload}) {
  switch (type) {
    case 'EDIT_LAYER':
      return Object.assign({}, payload);
    default:
      return state;
  }
};

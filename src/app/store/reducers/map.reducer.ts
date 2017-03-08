import { MapOptions } from '../../map/shared/map';

export function map(state: MapOptions = null, {type, payload}) {
  switch (type) {
    case 'SET_MAP':
      return Object.assign({}, payload);
    default:
      return state;
  }
};

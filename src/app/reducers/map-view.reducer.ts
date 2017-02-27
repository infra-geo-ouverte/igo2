export function mapView (state: olx.ViewOptions = null, {type, payload}) {
  switch (type) {
    case 'SET_VIEW':
      return Object.assign({}, payload);
    default:
      return state;
  }
};

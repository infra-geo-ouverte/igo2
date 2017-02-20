export function mapView (state: olx.ViewOptions = null, {type, payload}) {
  switch (type) {
    case 'UPDATE_VIEW':
      return Object.assign({}, payload);
    default:
      return state;
  }
};

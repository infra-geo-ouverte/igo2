export const mapView = (state: olx.ViewOptions = null, {type, payload}) => {
  switch (type) {
    case 'SET_VIEW':
      return Object.assign({}, payload);
    case 'SET_ZOOM':
      return Object.assign(state, {zoom: payload});
    default:
      return state;
  }
};

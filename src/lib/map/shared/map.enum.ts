export enum MapAction {
  BaseLayerSwitcher = 'baseLayerSwitcher',
  ZoomIn = 'zoomIn',
  ZoomOut = 'zoomOut',
  PreviousView = 'previousView',
  NextView = 'nextView',
  ClickInteraction = 'clickInteraction',
  Geolocation = 'geolocation',
  GoogleView = 'googleView'
}

export const MAP_DEFAULT_ACTIONS = [
  {
    id: MapAction.BaseLayerSwitcher,
    icon: 'photo_library',
    title: 'map.actionbar.baselayerswitcher.title'
  },
  {
    id: MapAction.ZoomIn,
    icon: 'zoom_in',
    title: 'map.actionbar.zoomin.title'
  },
  {
    id: MapAction.ZoomOut,
    icon: 'zoom_out',
    title: 'map.actionbar.zoomout.title'
  },
  {
    id: MapAction.PreviousView,
    icon: 'arrow_back',
    title: 'map.actionbar.previousview.title'
  },
  {
    id: MapAction.NextView,
    icon: 'arrow_forward',
    title: 'map.actionbar.nextview.title'
  },
  {
    id: MapAction.ClickInteraction,
    icon: 'mouse',
    title: 'map.actionbar.clickinteraction.title'
  },
  {
    id: MapAction.Geolocation,
    icon: 'my_location',
    title: 'map.actionbar.geolocation.title'
  },
  {
    id: MapAction.GoogleView,
    icon: 'streetview',
    title: 'map.actionbar.googleview.title'
  }
];

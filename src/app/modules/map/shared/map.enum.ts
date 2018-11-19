export const LAYER = 'layer';

export enum MapWidget {
  BaseLayerSwitcher = 'baseLayerSwitcher',
  ZoomIn = 'zoomIn',
  ZoomOut = 'zoomOut',
  PreviousView = 'previousView',
  NextView = 'nextView',
  ClickInteraction = 'clickInteraction',
  Geolocation = 'geolocation',
  GoogleView = 'googleView'
}

export const MAP_DEFAULT_WIDGETS = [
  {
    id: MapWidget.BaseLayerSwitcher,
    icon: 'photo_library',
    title: 'map.toolbar.baselayerswitcher.title'
  },
  {
    id: MapWidget.ZoomIn,
    icon: 'zoom_in',
    title: 'map.toolbar.zoomin.title'
  },
  {
    id: MapWidget.ZoomOut,
    icon: 'zoom_out',
    title: 'map.toolbar.zoomout.title'
  },
  {
    id: MapWidget.PreviousView,
    icon: 'arrow_back',
    title: 'map.toolbar.previousview.title'
  },
  {
    id: MapWidget.NextView,
    icon: 'arrow_forward',
    title: 'map.toolbar.nextview.title'
  },
  {
    id: MapWidget.ClickInteraction,
    icon: 'mouse',
    title: 'map.toolbar.clickinteraction.title'
  },
  {
    id: MapWidget.Geolocation,
    icon: 'my_location',
    title: 'map.toolbar.geolocation.title'
  },
  {
    id: MapWidget.GoogleView,
    icon: 'streetview',
    title: 'map.toolbar.googleview.title'
  }
];

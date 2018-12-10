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
    title: 'map.widgetbar.baselayerswitcher.title'
  },
  {
    id: MapWidget.ZoomIn,
    icon: 'zoom_in',
    title: 'map.widgetbar.zoomin.title'
  },
  {
    id: MapWidget.ZoomOut,
    icon: 'zoom_out',
    title: 'map.widgetbar.zoomout.title'
  },
  {
    id: MapWidget.PreviousView,
    icon: 'arrow_back',
    title: 'map.widgetbar.previousview.title'
  },
  {
    id: MapWidget.NextView,
    icon: 'arrow_forward',
    title: 'map.widgetbar.nextview.title'
  },
  {
    id: MapWidget.ClickInteraction,
    icon: 'mouse',
    title: 'map.widgetbar.clickinteraction.title'
  },
  {
    id: MapWidget.Geolocation,
    icon: 'my_location',
    title: 'map.widgetbar.geolocation.title'
  },
  {
    id: MapWidget.GoogleView,
    icon: 'streetview',
    title: 'map.widgetbar.googleview.title'
  }
];

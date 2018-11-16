export const LAYER = 'layer';

export enum MapTool {
  BaseLayerSwitcher = 'baseLayerSwitcher',
  ZoomIn = 'zoomIn',
  ZoomOut = 'zoomOut',
  PreviousView = 'previousView',
  NextView = 'nextView',
  ClickInteraction = 'clickInteraction',
  Geolocation = 'geolocation',
  GoogleView = 'googleView'
}

export const MAP_DEFAULT_TOOLS = [
  {
    name: MapTool.BaseLayerSwitcher,
    icon: 'photo_library',
    title: 'map.toolbar.baselayerswitcher.title'
  },
  {
    name: MapTool.ZoomIn,
    icon: 'zoom_in',
    title: 'map.toolbar.zoomin.title'
  },
  {
    name: MapTool.ZoomOut,
    icon: 'zoom_out',
    title: 'map.toolbar.zoomout.title'
  },
  {
    name: MapTool.PreviousView,
    icon: 'arrow_back',
    title: 'map.toolbar.previousview.title'
  },
  {
    name: MapTool.NextView,
    icon: 'arrow_forward',
    title: 'map.toolbar.nextview.title'
  },
  {
    name: MapTool.ClickInteraction,
    icon: 'mouse',
    title: 'map.toolbar.clickinteraction.title'
  },
  {
    name: MapTool.Geolocation,
    icon: 'my_location',
    title: 'map.toolbar.geolocation.title'
  },
  {
    name: MapTool.GoogleView,
    icon: 'streetview',
    title: 'map.toolbar.googleview.title'
  }
];

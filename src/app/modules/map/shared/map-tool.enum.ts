export enum MapTool {
  BaseLayerSwitcher = 'baseLayerSwitcher',
  ZoomIn = 'zoomIn',
  ZoomOut = 'zoomOut',
  PreviousView = 'previousView',
  NextView = 'nextView',
  ClickInteraction = 'clickInteraction',
  Geolocation = 'geolocation',
  GoogleView = 'googleView'  
};

export const MapDefaultTools = [
  {'name': MapTool.BaseLayerSwitcher, 'icon': 'photo_library'},
  {'name': MapTool.ZoomIn, 'icon': 'zoom_in'},
  {'name': MapTool.ZoomOut, 'icon': 'zoom_out'},
  {'name': MapTool.PreviousView, 'icon': 'arrow_back'},
  {'name': MapTool.NextView, 'icon': 'arrow_forward'},
  {'name': MapTool.ClickInteraction, 'icon': 'mouse'},
  {'name': MapTool.Geolocation, 'icon': 'my_location'},
  {'name': MapTool.GoogleView, 'icon': 'streetview'}
];
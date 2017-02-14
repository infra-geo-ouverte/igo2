import { Layer } from './layers/layer';
import { VectorLayer } from './layers/layer-vector';

export interface MapViewOptions extends olx.ViewOptions {
  projection?: string;
  center?: [number, number];
}

export class NgMap {

  olMap: ol.Map;

  private layers: Layer[] = [];
  private markerLayer: VectorLayer;
  private markerSource: ol.source.Vector;

  constructor() {
    this.olMap = new ol.Map({});

    this.markerLayer = new VectorLayer({
      name: 'Vector',
      type: 'vector',
      style: {
        text: new ol.style.Text({
          text: 'place',
          font: 'normal 36px Material Icons',
          textBaseline: 'Bottom',
          fill: new ol.style.Fill({
            color: [0, 161, 222, 1]
          }),
          stroke: new ol.style.Stroke({
            color: [255, 255, 255, 1],
            width: 2
          })
        })
      }
    });
    this.markerSource = (this.markerLayer.getSource() as ol.source.Vector);

    this.olMap.addLayer(this.markerLayer.olLayer);
    this.markerLayer.olLayer.setZIndex(999);
  }

  getProjection() {
    return this.olMap.getView().getProjection().getCode();
  }

  updateView(options: MapViewOptions) {
    const currentView = this.olMap.getView();
    const viewOptions = Object.assign({
      zoom: currentView.getZoom()
    }, currentView.getProperties());

    const view = new ol.View(Object.assign(viewOptions, options));
    this.olMap.setView(view);

    if (options.center) {
      const center = ol.proj.fromLonLat(options.center, this.getProjection());
      view.setCenter(center);
    }
  }

  addLayer(layer: Layer) {
    this.layers.push(layer);
    this.olMap.addLayer(layer.olLayer);
  }

  moveToFeature(feature: ol.Feature) {
    const view = this.olMap.getView();
    view.fit(feature.getGeometry().getExtent(), this.olMap.getSize(), {
      maxZoom: view.getZoom()
    });
  }

  zoomToFeature(feature: ol.Feature) {
    const view = this.olMap.getView();
    view.fit(feature.getGeometry().getExtent(), this.olMap.getSize(), {
      maxZoom: 17
    });
  }

  addMarker(feature: ol.Feature) {
    const geometry = feature.getGeometry();
    const geometryType = geometry.getType();

    let marker;
    if (geometryType === 'Point') {
      marker = feature;
    } else {
      const centroid = ol.extent.getCenter(geometry.getExtent());
      marker = new ol.Feature(new ol.geom.Point(centroid));
    }

    this.markerSource.addFeature(marker);
  }

  clearMarkers() {
    this.markerSource.clear();
  }
}

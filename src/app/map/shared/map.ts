import { Layer } from './layers/layer';
import { VectorLayer } from './layers/layer-vector';

export interface MapViewOptions extends olx.ViewOptions {
  projection?: string;
  center?: [number, number];
}

export interface MapOptions {
  view: MapViewOptions;
}

export class NgMap {

  olMap: ol.Map;

  private layers: Layer[] = [];
  private overlayLayer: VectorLayer;
  private overlaySource: ol.source.Vector;
  private overlayStyle: ol.style.Style;
  private overlayMarkerStyle: ol.style.Style;

  constructor() {
    this.olMap = new ol.Map({
      controls: [
        new ol.control.Attribution()
      ]
    });

    this.overlayStyle = new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: [0, 161, 222, 1],
        width: 3
      }),
      fill: new ol.style.Fill({
        color: [0, 161, 222, 0.1]
      })
    });

    this.overlayMarkerStyle = new ol.style.Style({
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
    });

    this.overlayLayer = new VectorLayer({
      name: 'Overlay',
      type: 'vector'
    });
    this.overlaySource = (this.overlayLayer.getSource() as ol.source.Vector);
    this.olMap.addLayer(this.overlayLayer.olLayer);
    this.overlayLayer.olLayer.setZIndex(999);
  }

  getProjection() {
    return this.olMap.getView().getProjection().getCode();
  }

  updateView(options: MapViewOptions) {
    const currentView = this.olMap.getView();
    const viewOptions = Object.assign({
      zoom: currentView.getZoom()
    }, currentView.getProperties());

    this.setView(Object.assign(viewOptions, options));
  }

  setView(options: MapViewOptions) {
    const view = new ol.View(options);
    this.olMap.setView(view);

    if (options && options.center) {
      const center = ol.proj.fromLonLat(options.center, this.getProjection());
      view.setCenter(center);
    }
  }

  zoomIn() {
    this.zoomTo(this.olMap.getView().getZoom() + 1);
  }

  zoomOut() {
    this.zoomTo(this.olMap.getView().getZoom() - 1);
  }

  zoomTo(zoom: number) {
    this.olMap.getView().animate({
      zoom: zoom,
      duration: 250,
      easing: ol.easing.easeOut
    });
  }

  addLayer(layer: Layer) {
    this.layers.push(layer);
    this.olMap.addLayer(layer.olLayer);
  }

  removeLayers() {
    this.layers.forEach(layer =>
      this.olMap.removeLayer(layer.olLayer), this);
  }

  moveToExtent(extent: ol.Extent) {
    const view = this.olMap.getView();
    view.fit(extent, this.olMap.getSize(), {
      maxZoom: view.getZoom()
    });
  }

  moveToFeature(feature: ol.Feature) {
    this.moveToExtent(feature.getGeometry().getExtent());
  }

  zoomToExtent(extent: ol.Extent) {
    const view = this.olMap.getView();
    view.fit(extent, this.olMap.getSize(), {
      maxZoom: 17
    });
  }

  zoomToFeature(feature: ol.Feature) {
    this.zoomToExtent(feature.getGeometry().getExtent());
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

      feature.setStyle(this.overlayStyle);
      this.overlaySource.addFeature(feature);
    }

    marker.setStyle(this.overlayMarkerStyle);
    this.overlaySource.addFeature(marker);
  }

  clearOverlay() {
    this.overlaySource.clear();
  }
}

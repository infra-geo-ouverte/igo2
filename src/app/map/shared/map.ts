import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Layer } from './layers/layer';
import { VectorLayer } from './layers/layer-vector';

export interface MapViewOptions extends olx.ViewOptions {
  projection?: string;
  center?: [number, number];
}

export interface MapOptions {
  view: MapViewOptions;
}

export class IgoMap {

  public olMap: ol.Map;
  public layers = new BehaviorSubject<Layer[]>([]);

  private _layers: Layer[] = [];
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
      image: new ol.style.Icon({
        src: 'assets/icons/place_blue_36px.svg',
        imgSize: [36, 36], // for ie
        anchor: [0.5, 1]
      })
    });

    this.overlayLayer = new VectorLayer({
      title: 'Overlay',
      type: 'vector'
    });
    this.overlaySource = (this.overlayLayer.getSource() as ol.source.Vector);
    this.olMap.addLayer(this.overlayLayer.getOlLayer());
    this.overlayLayer.getOlLayer().setZIndex(999);
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
    this.olMap.addLayer(layer.getOlLayer());

    this._layers.splice(0, 0, layer);
    this.sortLayers();
    this.layers.next(this._layers);
  }

  removeLayer(layer: Layer) {
    const index = this.getLayerIndex(layer);
    if (index >= 0) {
      this.olMap.removeLayer(layer.getOlLayer());
      this._layers.splice(index, 1);
    }
  }

  removeLayers() {
    this._layers.forEach(layer =>
      this.olMap.removeLayer(layer.getOlLayer()), this);
    this._layers = [];
  }

  raiseLayer(layer: Layer) {
    const index = this.getLayerIndex(layer);
    if (index > 0) {
      this.moveLayer(layer, index, index - 1);
    }
  }

  lowerLayer(layer: Layer) {
    const index = this.getLayerIndex(layer);
    if (index < this._layers.length - 1) {
      this.moveLayer(layer, index, index + 1);
    }
  }

  moveLayer(layer: Layer, from: number, to: number) {
    const layerTo = this._layers[to];
    const zIndexTo = layerTo.zIndex;
    const zIndexFrom = layer.zIndex;

    layer.zIndex = zIndexTo;
    layerTo.zIndex = zIndexFrom;

    this._layers[to] = layer;
    this._layers[from] = layerTo;
  }

  moveToExtent(extent: ol.Extent) {
    const view = this.olMap.getView();
    view.fit(extent, {
      maxZoom: view.getZoom()
    });
  }

  moveToFeature(feature: ol.Feature) {
    this.moveToExtent(feature.getGeometry().getExtent());
  }

  zoomToExtent(extent: ol.Extent) {
    const view = this.olMap.getView();
    view.fit(extent, {
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

  private sortLayers() {
    // Sort by descending zIndex
    this._layers.sort((layer1, layer2) => layer2.zIndex - layer1.zIndex);
  }

  private getLayerIndex(layer: Layer) {
    return this._layers.findIndex(layer_ => layer_ === layer);
  }
}

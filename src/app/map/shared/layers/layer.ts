import { IgoMap } from '../map';
import {
  LayerOptions,
  LayerLegendOptions,
  QueryableLayer,
  FilterableLayer
} from './layer.interface';

export abstract class Layer {

  public collapsed: boolean;
  public id: string;
  public map: IgoMap;
  public olLayer: ol.layer.Layer;
  public options: LayerOptions;

  get source(): ol.source.Source {
    return this.olLayer.getSource();
  }

  get type(): any {
    return this.options.type;
  }

  get title(): string {
    return this.options.alias ? this.options.alias : this.options.title;
  }

  set title(title: string) {
    this.options.title = title;
  }

  get zIndex(): number {
    return this.olLayer.getZIndex();
  }

  set zIndex(zIndex: number) {
    this.olLayer.setZIndex(zIndex);
  }

  get visible(): boolean {
    return this.olLayer.get('visible');
  }

  set visible(visibility: boolean) {
    this.olLayer.setVisible(visibility);
  }

  get opacity(): number {
    return this.olLayer.get('opacity');
  }

  set opacity(opacity: number) {
    this.olLayer.setOpacity(opacity);
  }

  constructor(options: LayerOptions) {
    this.options = options;
    this.id = this.generateId();

    this.olLayer = this.createOlLayer();
    if (options.zIndex !== undefined) {
      this.zIndex = options.zIndex;
    }

    const legend = options.legend || {};
    this.visible = options.visible === undefined ? true : options.visible;
    this.collapsed = legend.collapsed === undefined ? true : !this.visible;
  }

  protected abstract createOlLayer(): ol.layer.Layer;

  protected abstract generateId(): string;

  addToMap(map: IgoMap) {
    this.map = map;
    map.olMap.addLayer(this.olLayer);
  }

  getLegend(): LayerLegendOptions[] {
    return this.options.legend ? [this.options.legend] : [];
  }

  isFilterable(): this is FilterableLayer {
    const layer = this as any as FilterableLayer;
    if (typeof layer.filterByDate === 'function') {
      return layer.options.filterable ? layer.options.filterable : true;
    }

    return false;
  }

  isQueryable(): this is QueryableLayer {
    const layer = this as any as QueryableLayer;
    if (typeof layer.getQueryUrl === 'function') {
      return layer.options.queryable ? layer.options.queryable : true;
    }

    return false;
  }

}

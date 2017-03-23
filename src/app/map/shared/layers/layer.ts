import { IgoMap } from '../map';
import { LayerOptions, LayerLegendOptions } from './layer.interface';

export abstract class Layer {

  public collapsed: boolean;
  public id: string;
  public map: IgoMap;
  public olLayer: ol.layer.Layer;
  public options: LayerOptions;

  get source(): ol.source.Source {
    return this.olLayer.getSource();
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

  get queryable(): boolean {
    if (typeof (this as any).getQueryUrl === 'function') {
      return this.options.queryable ? this.options.queryable : true;
    }

    return false;
  }

  get filterable(): boolean {
    if (typeof (this as any).filterByDate === 'function') {
      return this.options.filterable ? this.options.filterable : true;
    }

    return false;
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
}

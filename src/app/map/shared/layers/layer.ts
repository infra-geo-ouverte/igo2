export interface LayerOptions extends olx.layer.BaseOptions {
  title: string;
  type: string;
  alias?: string;
  visible?: boolean;
  legend?: LayerLegendOptions;
  zIndex?: number;
}

export interface LayerLegendOptions {
  collapsed?: boolean;
  url?: string;
  html?: string;
  title?: string;
}

export abstract class Layer {

  public options: LayerOptions;

  public collapsed: boolean;

  public id: string;

  protected olLayer: ol.layer.Layer;

  get title (): string {
    return this.options.alias ? this.options.alias : this.options.title;
  }

  get zIndex (): number {
    return this.olLayer.getZIndex();
  }

  set zIndex (zIndex: number) {
    this.olLayer.setZIndex(zIndex);
  }

  get visible (): boolean {
    return this.getOlLayer().get('visible');
  }

  set visible (visibility: boolean) {
    this.getOlLayer().setVisible(visibility);
  }

  get opacity (): number {
    return this.getOlLayer().get('opacity');
  }

  set opacity (opacity: number) {
    this.getOlLayer().setOpacity(opacity);
  }

  constructor(options: LayerOptions) {
    this.options = options;

    this.olLayer = this.createOlLayer();
    if (options.zIndex !== undefined) {
      this.zIndex = options.zIndex;
    }

    this.visible = options.visible === undefined ? true : options.visible;

    const legend = options.legend || {};
    this.collapsed = legend.collapsed === undefined ? true : !this.visible;

    this.id = this.createId();
  }

  protected abstract createOlLayer(): ol.layer.Layer;
  protected abstract createId(): string;

  getOlLayer() {
    return this.olLayer;
  }

  getSource() {
    return this.getOlLayer().getSource();
  }

  getLegend(): LayerLegendOptions[] {
    return this.options.legend ? [this.options.legend] : [];
  }

}

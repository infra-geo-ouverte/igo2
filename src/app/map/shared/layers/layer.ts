export interface LayerOptions extends olx.layer.BaseOptions {
  title: string;
  type: string;
  visible?: boolean;
  legend?: LayerLegendOptions;
}

export interface LayerLegendOptions {
  collapsed?: boolean;
  url?: string;
  html?: string;
  title?: string;
}

export abstract class Layer {

  options: LayerOptions;
  collapsed: boolean;
  protected olLayer: ol.layer.Layer;

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
    this.visible = options.visible === undefined ? true : options.visible;

    const legend = options.legend || {};
    this.collapsed = legend.collapsed === undefined ? true : !this.visible;
  }

  protected abstract createOlLayer(): ol.layer.Layer;

  getOlLayer() {
    if (this.olLayer === undefined) {
      this.olLayer = this.createOlLayer();
    }

    return this.olLayer;
  }

  getSource() {
    return this.getOlLayer().getSource();
  }

  getLegend(): LayerLegendOptions[] {
    return this.options.legend ? [this.options.legend] : [];
  }
}

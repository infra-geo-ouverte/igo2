export interface LayerOptions extends olx.layer.BaseOptions {
  name: string;
  type: string;
  collapsed?: boolean;
  visible?: boolean;
}

export abstract class Layer {

  options: LayerOptions;
  collapsed: boolean;
  protected olLayer: ol.layer.Layer;

  get visible (): boolean {
    return this.getOlLayer().get('visible');
  }

  set visible (visibility: boolean) {
    this.getOlLayer().set('visible', visibility);
  }

  constructor(options: LayerOptions) {
    this.options = options;
    this.visible = options.visible === undefined ? true : options.visible;
    this.collapsed = options.collapsed === undefined ? true : options.collapsed;
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

  toggleVisibility() {
    this.visible = !this.visible;
  }
}

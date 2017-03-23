import { Layer } from './layer';
import { VectorLayerOptions } from './layer-vector.interface';

export class VectorLayer extends Layer {

  public options: VectorLayerOptions;
  public olLayer: ol.layer.Vector;

  protected createOlLayer(): ol.layer.Vector {
    const olLayerOptions = Object.assign(this.options.view || {}, {
      style: new ol.style.Style(this.options.style),
      source: new ol.source.Vector(this.options.source)
    });

    return new ol.layer.Vector(olLayerOptions);
  }

  protected createId() {
    return undefined;
  }

}

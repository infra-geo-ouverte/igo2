import { Layer, LayerOptions} from './layer';
import 'rxjs/add/operator/toPromise';

export interface WMSLayerOptions extends LayerOptions {
  source: olx.source.ImageWMSOptions;
  view?: olx.layer.TileOptions;
}

export class WMSLayer extends Layer {

  olLayer: ol.layer.Image;

  createOlLayer(options: WMSLayerOptions): ol.layer.Image {

      const olLayerOptions = Object.assign(options.view || {}, {
        source: new ol.source.ImageWMS(options.source)
      });
      return new ol.layer.Image(olLayerOptions);
  }

  constructor(options: WMSLayerOptions) {
    super(options);
  }

}

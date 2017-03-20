import { Md5 } from 'ts-md5/dist/md5';
import { Layer, LayerOptions, LayerLegendOptions} from './layer';

export interface DataUrl {
  format: string;
  onlineResource: string;
}

export interface WMSLayerOptions extends LayerOptions {
  source: olx.source.ImageWMSOptions;
  view?: olx.layer.TileOptions;
  dataUrl?: DataUrl;
  optionsFromCapabilities?: boolean;
}

export class WMSLayer extends Layer {

  public options: WMSLayerOptions;

  protected olLayer: ol.layer.Tile;

  constructor(options: WMSLayerOptions) {
    // Important: To use wms versions smaller than 1.3.0, SRS
    // needs to be supplied in the source "params"

    // We need to do this to override the default version
    // of openlayers which is uppercase
    const sourceParams: any = options.source.params;
    if (sourceParams && sourceParams.version) {
      sourceParams.VERSION = sourceParams.version;
    }

    super(options);
  }

  protected createOlLayer(): ol.layer.Image {
    const layerOptions = Object.assign({},
      this.options.view || {},
      this.options, {
        source: new ol.source.ImageWMS(this.options.source)
    });

    return new ol.layer.Image(layerOptions);
  }

  protected createId() {
    const layers = this.options.source.params['layers'];
    const chaine = this.options.type + this.options.source.url + layers;
    return Md5.hashStr(chaine) as string;
  }

  getLegend(): LayerLegendOptions[] {
    let legend = super.getLegend();
    if (legend.length > 0) {
      return legend;
    }

    const sourceParams = this.options.source.params || {} as any;

    let layers = [];
    if (sourceParams.layers !== undefined) {
      layers = sourceParams.layers.split(',');
    }

    const baseUrl = this.options.source.url.replace(/\?$/, '');
    const params = [
      'REQUEST=GetLegendGraphic',
      'SERVICE=wms',
      'FORMAT=image/png',
      'SLD_VERSION=1.1.0',
      `VERSION=${sourceParams.version || '1.3.0'}`
    ];

    legend = layers.map((layer: string) => {
      return {
        url: `${baseUrl}?${params.join('&')}&LAYER=${layer}`,
        title: layers.length > 1 ? layer : undefined
      };
    });

    return legend;
  }
}

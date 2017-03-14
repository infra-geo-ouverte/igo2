import { Layer, LayerOptions, LayerLegendOptions} from './layer';

export interface DataURL {
  format: string;
  onlineResource: string;
}

export interface WMSLayerOptions extends LayerOptions {
  source: olx.source.ImageWMSOptions;
  view?: olx.layer.TileOptions;
  optionsFromCapabilities?: boolean;
  dataURL?: DataURL;
}

export class WMSLayer extends Layer {

  options: WMSLayerOptions;
  capabilities?: ol.format.XML;
  protected olLayer: ol.layer.Tile;

  constructor(options: WMSLayerOptions, capabilities?: ol.format.XML) {
    // Important: To use wms versions smaller than 1.3.0, SRS
    // needs to be supplied in the source "params"

    super(options);

    // We need to do this to override the default version
    // of openlayers which is uppercase
    const sourceParams: any = this.options.source.params;
    if (sourceParams && sourceParams.version) {
      sourceParams.VERSION = sourceParams.version;
    }
    this.capabilities = capabilities;
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

  protected createOlLayer(): ol.layer.Image {
    let layerOptions;
    if (this.capabilities) {
      const capabilityOptions = this.getOptionsFromCapabilities();
      layerOptions = Object.assign(this.options.view || {}, capabilityOptions, {
        source: new ol.source.ImageWMS(capabilityOptions.source)
      });
    } else {
      layerOptions = Object.assign(this.options.view || {}, this.options, {
        source: new ol.source.ImageWMS(this.options.source)
      });
    }
    return new ol.layer.Image(layerOptions);
  }

  /** Get layer's properties from capabilities */
  getOptionsFromCapabilities(): WMSLayerOptions {
    const capabilities = this.capabilities as any;
    const layer = this.findLayerInCapabilities(
      capabilities.Capability.Layer,
      this.options.source.params['layers']);

    // TODO: getcapabilities attribution is not working
    // let attribution;
    // if (layer.Attribution) {
    //   attribution = {
    //     title: layer.Attribution.Title,
    //     url: layer.Attribution.OnlineResource
    //   };
    // } else if (capabilities.Capability.Layer.Attribution) {
    //   // TODO: support LogoURL
    //   attribution = {
    //     title: capabilities.Capability.Layer.Attribution.Title,
    //     url: capabilities.Capability.Layer.Attribution.OnlineResource
    //   };
    // }
    //
    // if (attribution) {
    //   Object.assign(options.source, {
    //     'attributions': new ol.Attribution({
    //       html: '<a href="' + attribution.onlineResource +
    //       '" target="_blank">' +
    //       attribution.title +
    //       '</a>'
    //     })
    //   }
    //   );
    // }

    const optionsFromCapabilities: any = {};
    if (layer.Title) {
      optionsFromCapabilities.title = layer.Title;
    }

    if (layer.MaxScaleDenominator) {
      optionsFromCapabilities.maxResolution = layer.MaxScaleDenominator;
    }

    if (layer.MinScaleDenominator) {
      optionsFromCapabilities.minResolution = layer.MinScaleDenominator;
    }

    if (layer.DataURL && layer.DataURL[0] && layer.DataURL.OnlineResource) {
      optionsFromCapabilities.dataURL = {
        format: layer.DataURL[0].Format,
        onlineResource: layer.DataURL[0].OnlineResource
      };
    }

    // TODO: getcapabilities bounding box (which EPSG ? use EX_GeographicBoundingBox ?)
    // if(layer.BoundingBox) {
    //   options.extent = [layer.BoundingBox[0].extent[0], layer.BoundingBox[0].extent[1],
    //     layer.BoundingBox[0].extent[2], layer.BoundingBox[0].extent[3]];
    // }

    return Object.assign(optionsFromCapabilities, this.options);
  }

  /** Find a layer among capabilities's layers from it's name */
  findLayerInCapabilities(layerArray, name) {
    if (Array.isArray(layerArray)) {
      let layer;
      layerArray.find(value => {
        layer = this.findLayerInCapabilities(value, name);
        if (layer) {
          return true;
        }
        return false;
      }, this);
      return layer;
    } else if (layerArray.Layer) {
      return this.findLayerInCapabilities(layerArray.Layer, name);
    } else {
      if (layerArray.Name) {
        if (layerArray.Name === name) {
          return layerArray;
        }
      }
      return undefined;
    }
  }

}

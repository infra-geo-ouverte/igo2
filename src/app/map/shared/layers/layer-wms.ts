import { Layer, LayerOptions} from './layer';

export interface WMSLayerOptions extends LayerOptions {
  source: olx.source.ImageWMSOptions;
  view?: olx.layer.TileOptions;
  optionsFromCapabilities?: boolean;
}

export class WMSLayer extends Layer {

  olLayer: ol.layer.Image;

  constructor(options: WMSLayerOptions, capabilities?: ol.format.XML) {
    super(options, capabilities);
  }

  createOlLayer(options: WMSLayerOptions,
    capabilities: ol.format.WMSCapabilities): ol.layer.Image {

    if (capabilities) {

      const olLayerOptionsGetCapabilities = this.optionsFromCapabilities(capabilities,
        options);

      const olLayerOptions = Object.assign(options.view || {}, olLayerOptionsGetCapabilities, {
        source: new ol.source.ImageWMS(olLayerOptionsGetCapabilities.source)
      });
      return new ol.layer.Image(olLayerOptions);

    } else {
      const olLayerOptions = Object.assign(options.view || {}, options, {
        source: new ol.source.ImageWMS(options.source)
      });

      return new ol.layer.Image(olLayerOptions);
    }

  }

  /** Get layer's properties from capabilities */
  optionsFromCapabilities(capabilities: any,
    options: WMSLayerOptions): WMSLayerOptions {

    const layer = this.findLayer(capabilities.Capability.Layer, options.source.params['layers']);

    let attribution;
    if (layer.attributions) {
      attribution = layer.attributions;
    } else if (capabilities.Capability.Layer.Attribution) {
      attribution = capabilities.Capability.Layer.Attribution;
    }

    if (attribution) {
      Object.assign(options.source, {
        'attributions': new ol.Attribution({
          html: '<a href="' + attribution.OnlineResource +
          '" target="_blank">' +
          attribution.Title +
          '</a>'
        })
      }
      );
    }

    if (layer.Title) {
      options.title = layer.Title;
    }

    if (layer.MaxScaleDenominator) {
      options.maxResolution = layer.MaxScaleDenominator;
    }

    if (layer.MinScaleDenominator) {
      options.minResolution = layer.MinScaleDenominator;
    }

    if (layer.DataURL) {
      options.dataURL = layer.DataURL;
    }

    if (layer.BoundingBox) {
      options.extent = [layer.BoundingBox[0].extent[0], layer.BoundingBox[0].extent[1],
        layer.BoundingBox[0].extent[2], layer.BoundingBox[0].extent[3]];
    }

    return options;
  }

  /** Find a layer among capabilities's layers from it's name */
  findLayer(layerArray, name) {

    if (Array.isArray(layerArray)) {
      let layer;
      layerArray.find(value => {
        layer = this.findLayer(value, name);
        if (layer) {
          return true;
        }
        return false;
      }, this);
      return layer;
    } else if (layerArray.Layer) {
      return this.findLayer(layerArray.Layer, name);
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

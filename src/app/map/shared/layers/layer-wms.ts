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
      this.olLayer = new ol.layer.Image(olLayerOptions);

    } else {
      const olLayerOptions = Object.assign(options.view || {}, options, {
        source: new ol.source.ImageWMS(options.source)
      });
      this.olLayer = new ol.layer.Image(olLayerOptions);
    }
    return this.olLayer;
  }

  /** Get layer's properties from capabilities */
  optionsFromCapabilities(capabilities: any,
    options: WMSLayerOptions): WMSLayerOptions {

    const layer = this.findLayerInCapabilities(capabilities.Capability.Layer,
      options.source.params['layers']);

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

    Object.assign(optionsFromCapabilities, options);
    return optionsFromCapabilities;
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

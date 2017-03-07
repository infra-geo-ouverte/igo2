import { Layer, LayerOptions} from './layer';

export interface WMTSLayerOptions extends LayerOptions {
  source: olx.source.WMTSOptions;
  view?: olx.layer.TileOptions;
  optionsFromCapabilities?: boolean;
}

export class WMTSLayer extends Layer {

  options: WMTSLayerOptions;
  capabilities?: ol.format.XML;
  protected olLayer: ol.layer.Tile;

  constructor(options: WMTSLayerOptions, capabilities?: ol.format.XML) {
    super(options);
    this.capabilities = capabilities;
  }

  protected createOlLayer(): ol.layer.Tile {
    let sourceOptions;
    if (this.capabilities) {
      sourceOptions = ol.source.WMTS.optionsFromCapabilities(
        this.capabilities, this.options.source);
    } else {
      sourceOptions = Object.assign({
        tileGrid: this.getDefaultTileGrid(this.options)
      }, this.options.source);
    }

    const layerOptions = Object.assign({}, this.options.view || {}, {
      source: new ol.source.WMTS(sourceOptions)
    });

    return new ol.layer.Tile(layerOptions);
  }

  // TODO Support other projections ?
  getDefaultTileGrid(options: WMTSLayerOptions): ol.tilegrid.WMTS {

    const projection = options.source.projection ?
      ol.proj.get(options.source.projection) :
      ol.proj.get('EPSG:3857');
    const projectionExtent = projection.getExtent();
    const size = ol.extent.getWidth(projectionExtent) / 256;
    const resolutions = new Array(20);
    const matrixIds = new Array(20);
    for (let z = 0; z < 20; ++z) {
      resolutions[z] = size / Math.pow(2, z);
      matrixIds[z] = z;
    }

    return new ol.tilegrid.WMTS({
      origin: ol.extent.getTopLeft(projectionExtent),
      resolutions: resolutions,
      matrixIds: matrixIds
    });
  }
}

import { Layer, LayerOptions} from './layer';
import 'rxjs/add/operator/toPromise';

export interface WMTSLayerOptions extends LayerOptions {
  source: olx.source.WMTSOptions;
  view?: olx.layer.TileOptions;
  optionsFromCapabilities?: boolean;
}

export class WMTSLayer extends Layer {

  olLayer: ol.layer.Tile;

  createOlLayer(options: WMTSLayerOptions,
                capabilities: ol.format.WMTSCapabilities): ol.layer.Tile {

    if ( capabilities ) {

      const olLayerOptionsGetCapabilities = ol.source.WMTS.optionsFromCapabilities(capabilities,
                                                                                    options.source);

      const olLayerOptions = Object.assign({}, options.view, {
        source: new ol.source.WMTS(olLayerOptionsGetCapabilities)
      });
      return new ol.layer.Tile(olLayerOptions);

    } else {
      const optionsSource = Object.assign({},
                                          options.source,
                                          { tileGrid : this.getDefaultTileGrid() }
                            );
      return new ol.layer.Tile( {source: new ol.source.WMTS(optionsSource)} );
    }
  }

  constructor(options: WMTSLayerOptions, capabilities?: ol.format.XML) {
    super(options, capabilities);
  }

  // TODO Support others projections ?
  getDefaultTileGrid(): ol.tilegrid.WMTS {

    const projection = ol.proj.get('EPSG:3857');
    const projectionExtent = projection.getExtent();
    const size = ol.extent.getWidth(projectionExtent) / 256;
    const resolutions = new Array(14);
    const matrixIds = new Array(14);
    for ( let z = 0; z < 14; ++z ) {
      resolutions[z] = size / Math.pow(2, z);
      matrixIds[z] = z;
    }

    return new ol.tilegrid.WMTS({ origin: ol.extent.getTopLeft(projectionExtent),
                                  resolutions: resolutions,
                                  matrixIds: matrixIds
                                });
  }
}

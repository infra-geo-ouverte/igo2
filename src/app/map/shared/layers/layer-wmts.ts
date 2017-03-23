import { Md5 } from 'ts-md5/dist/md5';

import { Layer } from './layer';
import { WMTSLayerOptions } from './layer-wmts.interface';

export class WMTSLayer extends Layer {

  public options: WMTSLayerOptions;
  public olLayer: ol.layer.Tile;

  // TODO: Support other projections ?
  static getDefaultTileGrid(epsg?: string): ol.tilegrid.WMTS {
    const projection = epsg ? ol.proj.get(epsg) : ol.proj.get('EPSG:3857');
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

  constructor(options: WMTSLayerOptions) {
    super(options);
  }

  protected createOlLayer(): ol.layer.Image {
    const projection = this.options.source.projection as string;
    const sourceOptions = Object.assign({
      tileGrid: WMTSLayer.getDefaultTileGrid(projection)
    }, this.options.source);

    const layerOptions = Object.assign({}, this.options.view || {}, {
      source: new ol.source.WMTS(sourceOptions)
    });

    return new ol.layer.Tile(layerOptions);
  }

  protected createId() {
    const layer = this.options.source['layer'];
    const chain = this.options.type + this.options.source.url + layer;
    return Md5.hashStr(chain) as string;
  }

}

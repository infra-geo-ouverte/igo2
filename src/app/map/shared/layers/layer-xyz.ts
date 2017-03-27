import { Md5 } from 'ts-md5/dist/md5';

import { Layer } from './layer';
import { XYZLayerOptions } from './layer-xyz.interface';

export class XYZLayer extends Layer {

  public options: XYZLayerOptions;
  public olLayer: ol.layer.Tile;

  protected createOlLayer(): ol.layer.Tile {
    const olLayerOptions = Object.assign(this.options.view || {}, {
      source: new ol.source.XYZ(this.options.source)
    });

    return new ol.layer.Tile(olLayerOptions);
  }

  protected generateId() {
    const chain = this.options.type + this.options.source.url;
    return Md5.hashStr(chain) as string;
  }
}

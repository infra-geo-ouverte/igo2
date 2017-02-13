import { Injectable } from '@angular/core';

import { Layer, LayerOptions } from './layers/layer';
import { OSMLayer } from './layers/layer-osm';
import { VectorLayer } from './layers/layer-vector';
import { XYZLayer } from './layers/layer-xyz';

@Injectable()
export class LayerService {

  static layerClasses = {
    osm: OSMLayer,
    vector: VectorLayer,
    xyz: XYZLayer,
  };

  constructor() { }

  createLayer(options: LayerOptions): Layer {
    const layerCls = LayerService.layerClasses[options.type];

    return new layerCls(options);
  }
}

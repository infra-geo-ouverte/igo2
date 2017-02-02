import { Injectable } from '@angular/core';

import { LayerOptions } from './layer.interface';
import { Layer } from './layer.model';
import { OSMLayer } from './layer-osm.model';
import { XYZLayer } from './layer-xyz.model';

@Injectable()
export class LayerService {

  private layerClassesMapping = {
    'osm': OSMLayer,
    'xyz': XYZLayer
  };

  constructor() { }

  createLayer(options: LayerOptions): Layer {
    const layerCls = this.layerClassesMapping[options.type];

    return new layerCls(options);
  }
}

import proj4 from 'proj4';
import * as olproj from 'ol/proj';
import * as olproj4 from 'ol/proj/proj4';

import { Injectable, Optional } from '@angular/core';

import { ConfigService } from '@igo2/core';

import { Projection } from './projection.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectionService {

  constructor(
    @Optional() private config: ConfigService
  ) {
    if (this.config) {
      let projections = this.config.getConfig('projections') || [];
      projections.forEach((projection: Projection) => {
        this.registerProjection(projection);
      })
    }
  }

  registerProjection(projection: Projection) {
    proj4.defs(projection.code, projection.def);
    olproj4.register(proj4);
    olproj.get(projection.code).setExtent(projection.extent);
  }

}

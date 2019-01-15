import { Injectable } from '@angular/core';

import proj4 from 'proj4';
import * as olproj from 'ol/proj';
import * as olproj4 from 'ol/proj/proj4';

import { ConfigService } from '@igo2/core';

import { Projection } from './projection.interfaces';

/**
 * When injected, this service automatically registers and
 * projection defined in the application config. A custom projection
 * needs to be registered to be usable by OL.
 */
@Injectable({
  providedIn: 'root'
})
export class ProjectionService {

  constructor(private config: ConfigService) {
    const projections = this.config.getConfig('projections') || [];
    projections.forEach((projection: Projection) => {
      this.registerProjection(projection);
    });
  }

  /**
   * Define a proj4 projection and register it in OL
   * @param projection Projection
   */
  registerProjection(projection: Projection) {
    proj4.defs(projection.code, projection.def);
    olproj4.register(proj4);
    olproj.get(projection.code).setExtent(projection.extent);
  }

}

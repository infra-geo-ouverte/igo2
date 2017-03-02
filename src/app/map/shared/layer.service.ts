import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { URLSearchParams, Request, RequestMethod } from '@angular/http';

import { Layer, LayerOptions } from './layers/layer';
import { OSMLayer } from './layers/layer-osm';
import { VectorLayer } from './layers/layer-vector';
import { XYZLayer } from './layers/layer-xyz';
import { WMTSLayer } from './layers/layer-wmts';
import { WMSLayer } from './layers/layer-wms';

@Injectable()
export class LayerService {

  static layerClasses = {
    osm: OSMLayer,
    vector: VectorLayer,
    xyz: XYZLayer,
    wmts: WMTSLayer,
    wms: WMSLayer
  };

  public capabilitiesStore: any[] = [];

  constructor(private http: Http) { }

  createLayer(options: LayerOptions): Observable<Layer> {

    const layerCls = LayerService.layerClasses[options.type];

    if (options.optionsFromCapabilities) {
       return this.getCapabilities(options).map(
        capabilities => {
          return new layerCls(options, capabilities);
        });
    } else {
      return new Observable(layer => layer.next(new layerCls(options)));
    }
  }

  getCapabilities(options): Observable<any> {

    const params = new URLSearchParams();
    params.set('request', 'GetCapabilities');
    params.set('service', options.type);
    params.set('version', ( options.version ? options.version : '1.0.0' ) );

    const request = new Request({
      method: RequestMethod.Get,
      url: options.source.url,
      search: params
    });

    const url = options.source.url + '?' + params.toString();

    let capabilities = this.capabilitiesStore.find(value => value.url === url);

    if (capabilities) {
     return capabilities.capabilities;
    } else {

      return this.http.request(request)
              .map(response => {

                  let parser;
                  switch (options.type) {
                    case 'wmts':
                      parser = new ol.format.WMTSCapabilities();
                      break;
                    case 'wms':
                      parser = new ol.format.WMSCapabilities();
                      break;
                  }

                  capabilities = parser.read(response.text());
                  this.capabilitiesStore.push({url: url, capabilities: capabilities});
                  return capabilities;
              });
    }
  }
}

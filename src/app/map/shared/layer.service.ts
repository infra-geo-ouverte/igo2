import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Layer, LayerOptions } from './layers/layer';
import { OSMLayer } from './layers/layer-osm';
import { VectorLayer } from './layers/layer-vector';
import { XYZLayer } from './layers/layer-xyz';
import { WMTSLayer } from './layers/layer-wmts';

@Injectable()
export class LayerService {

  getCapabilitiesStore: any[] = [];

  static layerClasses = {
    osm: OSMLayer,
    vector: VectorLayer,
    xyz: XYZLayer,
    wmts: WMTSLayer
  };

  constructor(private http: Http) { }

  createLayer(options: LayerOptions): Observable<Layer> {
    
    const layerCls = LayerService.layerClasses[options.type];

    if(options.optionsFromCapabilities){
       return this.getCapabilities(options).map(
        getCapabilities => {
          return new layerCls(options, getCapabilities);
        });
    }
    else{    
      return new Observable(layer => layer.next(new layerCls(options)));
    }
  }

  getCapabilities(options): Observable<any>{
    let url = options.source.url + '?REQUEST=GetCapabilities&';
    url += 'SERVICE=' + options.type + '&';
    url += 'VERSION=' + (options.version ? options.version : '1.0.0') + '&';

    const getCapabilities = this.findGetCapabilities(url);
    if (getCapabilities){
     return getCapabilities.getCapabilities;
    } else {
      return this.http.get(url)
              .map(response => {  

                  let parser;
                  switch (options.type) {
                    case "wmts":
                      parser = new ol.format.WMTSCapabilities();
                      break;
                    case "wms":
                      parser = new ol.format.WMSCapabilities();
                      break;
                  }
                  
                  const getCapabilities = parser.read(response.text());
                  this.getCapabilitiesStore.push({url: url, getCapbilities: getCapabilities});
                  return getCapabilities;
              });
    }
     
  }

  findGetCapabilities(url: string): any{
   
    return this.getCapabilitiesStore.find(function(value, idx, array){
      if (value.url === url){
        return value;
      }
    }, this);

  }
}

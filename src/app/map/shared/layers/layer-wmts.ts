import { Layer, LayerOptions} from './layer';
import { Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';

export interface WMTSLayerOptions extends LayerOptions {
  source: olx.source.WMTSOptions;
  view?: olx.layer.TileOptions;
  optionsFromCapabilities?: boolean;
}

export class WMTSLayer extends Layer {

  olLayer: ol.layer.Tile;
  getCapabilitiesResponse: any;

  createOlLayer(options: WMTSLayerOptions, getCapabilities: ol.format.WMTSCapabilities): ol.layer.Tile {

    if(getCapabilities){ 
      
      const olLayerOptionsGetCapabilities = ol.source.WMTS.optionsFromCapabilities(getCapabilities, options.source);

      const olLayerOptions = Object.assign(options.view || {}, {
        source: new ol.source.WMTS(olLayerOptionsGetCapabilities)
      });
      return new ol.layer.Tile(olLayerOptions);
      
    }else{

        const projection =  ol.proj.get('EPSG:3857');//this.projection;
        const projectionExtent = projection.getExtent();
        const size = ol.extent.getWidth(projectionExtent) / 256;
        const resolutions = new Array(14);
        const matrixIds = new Array(14);
        for (let z = 0; z < 14; ++z) {
          resolutions[z] = size / Math.pow(2, z);
          matrixIds[z] = z;
        }

        options.source = Object.assign(options.source, {tileGrid: new ol.tilegrid.WMTS({
                            origin: ol.extent.getTopLeft(projectionExtent),
                            resolutions: resolutions,
                            matrixIds: matrixIds
                          })});

         return new ol.layer.Tile({source: new ol.source.WMTS(options.source)});
    }
  }

  constructor(options: WMTSLayerOptions, getCapabilities?: ol.format.XML) {
    super(options, getCapabilities);
  }
}
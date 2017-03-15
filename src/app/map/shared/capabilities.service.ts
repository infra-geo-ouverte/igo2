import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { RequestService } from '../../core/request.service';

import { WMTSLayerOptions } from './layers/layer-wmts';
import { WMSLayerOptions } from './layers/layer-wms';

@Injectable()
export class CapabilitiesService {

  private capabilitiesStore: any[] = [];
  private parsers = {
    'wms': new ol.format.WMSCapabilities(),
    'wmts': new ol.format.WMTSCapabilities()
  };

  constructor(private http: Http,
              private requestService: RequestService) { }

  getWMSOptions(baseOptions: WMSLayerOptions): Observable<WMSLayerOptions> {
    const url = baseOptions.source.url;
    const version = (baseOptions.source.params as any).version;

    return this.getCapabilities('wms', url, version)
      .map((capabilities: any) =>
        this.parseWMSOptions(baseOptions, capabilities));
  }

  getWMTSOptions(baseOptions: WMTSLayerOptions): Observable<WMTSLayerOptions> {
    const url = baseOptions.source.url;
    const version = baseOptions.source.version;

    const options = this.getCapabilities('wmts', url, version)
      .map((capabilities: any) =>
        this.parseWMTSOptions(baseOptions, capabilities));

    return options;
  }

  private parseWMSOptions(baseOptions: WMSLayerOptions,
                          capabilities: any): WMSLayerOptions {
    const layers = (baseOptions.source.params as any).layers;
    const layer = this.findLayerInCapabilities(
      capabilities.Capability.Layer, layers);

    const options: any = {};
    if (layer.Title) {
      // Save title under "alias" because we want to overwrite
      // the default, mandatory title. If the title defined
      // in the context is to be used along with the
      // "optionsFromCapabilities" option, then it should be
      // defined under "alias" in the context
      options.alias = layer.Title;
    }

    if (layer.MaxScaleDenominator) {
      options.maxResolution = layer.MaxScaleDenominator;
    }

    if (layer.MinScaleDenominator) {
      options.minResolution = layer.MinScaleDenominator;
    }

    if (layer.DataURL && layer.DataURL[0] && layer.DataURL.OnlineResource) {
      options.dataUrl = {
        format: layer.DataURL[0].Format,
        onlineResource: layer.DataURL[0].OnlineResource
      };
    }

    return Object.assign(options, baseOptions);
  }

  private parseWMTSOptions(baseOptions: WMTSLayerOptions,
                           capabilities: any): WMTSLayerOptions {
    const sourceOptions = ol.source.WMTS.optionsFromCapabilities(
      capabilities, baseOptions.source);

    return Object.assign({}, baseOptions, {source: sourceOptions});
  }

  private getCapabilities(service: 'wms' | 'wmts',
                          baseUrl: string,
                          version?: string): Observable<any> {

    const params = new URLSearchParams();
    params.set('request', 'GetCapabilities');
    params.set('service', service);
    params.set('version', version || '1.3.0');

    const url = baseUrl + '?' + params.toString();
    const cached = this.capabilitiesStore.find(value => value.url === url);
    if (cached !== undefined) {
      return new Observable(c => c.next(cached.capabilities));
    }

    const request = this.http.get(baseUrl, {search: params});

    return this.requestService.register(request)
      .map((res: Response) => {
        const capabilities = this.parsers[service].read(res.text());
        this.cache(url, capabilities);

        return capabilities;
      });
  }

  private cache(url: string, capabilities: any) {
    this.capabilitiesStore.push({
      url: url,
      capabilities: capabilities
    });
  }

  /** Find a layer among capabilities's layers from it's name */
  private findLayerInCapabilities(layerArray, name) {
    if (Array.isArray(layerArray)) {
      let layer;
      layerArray.find(value => {
        layer = this.findLayerInCapabilities(value, name);

        return layer !== undefined;
      }, this);

      return layer;
    } else if (layerArray.Layer) {
      return this.findLayerInCapabilities(layerArray.Layer, name);
    } else {
      if (layerArray.Name && layerArray.Name === name) {
        return layerArray;
      }

      return undefined;
    }
  }

}

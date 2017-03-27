import { Md5 } from 'ts-md5/dist/md5';

import { Layer } from './layer';
import { LayerLegendOptions, QueryableLayer,
         FilterableLayer } from './layer.interface';
import { WMSLayerOptions } from './layer-wms.interface';
import { QueryFormat } from '../query.service';

export class WMSLayer
  extends Layer implements QueryableLayer, FilterableLayer {

  public options: WMSLayerOptions;
  public olLayer: ol.layer.Image;

  private queryInfoFormat: string;

  get params(): any {
    return this.options.source.params as any;
  }

  get queryFormat(): QueryFormat {
    return this.options.queryFormat ? this.options.queryFormat : QueryFormat.GML2;
  }

  get queryTitle(): string {
    return this.options.queryTitle ? this.options.queryTitle : 'title';
  }

  constructor(options: WMSLayerOptions) {
    // Important: To use wms versions smaller than 1.3.0, SRS
    // needs to be supplied in the source "params"

    // We need to do this to override the default version
    // of openlayers which is uppercase
    const sourceParams: any = options.source.params;
    if (sourceParams && sourceParams.version) {
      sourceParams.VERSION = sourceParams.version;
    }

    super(options);

    let queryInfoFormat;
    switch (this.queryFormat) {
      case QueryFormat.GML2:
        queryInfoFormat = 'application/vnd.ogc.gml';
        break;
      case QueryFormat.GML3:
        queryInfoFormat = 'application/vnd.ogc.gml/3.1.1';
        break;
      case QueryFormat.JSON:
        queryInfoFormat = 'application/json';
        break;
      case QueryFormat.TEXT:
        queryInfoFormat = 'text/plain';
        break;
      default:
        break;
    }

    this.queryInfoFormat = queryInfoFormat;
  }

  protected createOlLayer(): ol.layer.Image {
    const layerOptions = Object.assign({},
      this.options.view || {},
      this.options, {
        source: new ol.source.ImageWMS(this.options.source)
    });

    return new ol.layer.Image(layerOptions);
  }

  protected generateId() {
    const layers = this.params.layers;
    const chain = this.options.type + this.options.source.url + layers;

    return Md5.hashStr(chain) as string;
  }

  getLegend(): LayerLegendOptions[] {
    let legend = super.getLegend();
    if (legend.length > 0) {
      return legend;
    }

    const sourceParams = this.params;

    let layers = [];
    if (sourceParams.layers !== undefined) {
      layers = sourceParams.layers.split(',');
    }

    const baseUrl = this.options.source.url.replace(/\?$/, '');
    const params = [
      'REQUEST=GetLegendGraphic',
      'SERVICE=wms',
      'FORMAT=image/png',
      'SLD_VERSION=1.1.0',
      `VERSION=${sourceParams.version || '1.3.0'}`
    ];

    legend = layers.map((layer: string) => {
      return {
        url: `${baseUrl}?${params.join('&')}&LAYER=${layer}`,
        title: layers.length > 1 ? layer : undefined
      };
    });

    return legend;
  }

  getQueryUrl(coordinates: [number, number]): string {
    const view = this.map.olMap.getView();
    const source = this.source as ol.source.ImageWMS;

    const url = source.getGetFeatureInfoUrl(
      coordinates,
      view.getResolution(),
      this.map.getProjection(), {
        'INFO_FORMAT': this.queryInfoFormat,
        'QUERY_LAYERS': this.params.layers
      });

    return url;
  }

  filterByDate(date: Date | [Date, Date]) {
    const dates = [];
    if (Array.isArray(date)) {
      if (date[0] !== undefined) {
        dates.push(date[0]);
      }

      if (date[1] !== undefined) {
        dates.push(date[1]);
      }
    } else if (date !== undefined) {
      dates.push(date);
    }

    const source = this.source as ol.source.ImageWMS;
    source.updateParams({'time': dates.map(d => d.toISOString()).join('/')});
  }
}

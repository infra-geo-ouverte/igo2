import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';
import { IgoStore } from '../../store/store';

import { RequestService } from '../../core/request.service';
import { SearchResult } from '../../search/shared/search-result.interface';
import { SearchResultType,
         SearchResultFormat } from '../../search/shared/search-result.enum';

import { Layer, QueryableLayer } from './layers';

export enum QueryFormat {
  GML2 = 'gml2' as any,
  GML3 = 'gml3' as any,
  JSON = 'json' as any,
  TEXT = 'text' as any
}

@Injectable()
export class QueryService {
  subscriptions: Subscription[] = [];

  constructor(private store: Store<IgoStore>,
              private http: Http,
              private requestService: RequestService) { }

  query(layers: Layer[], coordinates: [number, number]) {
    this.unsubscribe();
    this.subscriptions = layers.map((layer: Layer) =>
      this.queryLayer(layer, coordinates));
  }

  queryLayer(layer: Layer, coordinates: [number, number]) {
    const request = this.http.get(
      (layer as any as QueryableLayer).getQueryUrl(coordinates));

    return this.requestService
      .register(request, layer.title)
      .map(res => this.extractData(res, layer))
      .subscribe((results: SearchResult[]) =>
        this.handleQueryResults(results, layer));
  }

  clear() {
    this.unsubscribe();
    this.store.dispatch({type: 'CLEAR_SEARCH_RESULTS'});
  }

  private unsubscribe() {
    this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }

  private extractData(res: Response, layer: Layer): SearchResult[] {
    const queryLayer = (layer as any as QueryableLayer);

    let results = [];
    switch (queryLayer.queryFormat) {
      case QueryFormat.GML2:
        results = this.extractGML2Data(res);
        break;
      case QueryFormat.GML3:
        results = this.extractGML3Data(res);
        break;
      case QueryFormat.JSON:
        results = this.extractGeoJSONData(res);
        break;
      case QueryFormat.TEXT:
        results = this.extractTextData(res);
        break;
      default:
        break;
    }

    return results.map((result: SearchResult, index: number) => {
      const title = result.properties[queryLayer.queryTitle];
      return Object.assign(result, {
        source: layer.title,
        title: title ? title : `${layer.title} (${index + 1})`,
        projection: layer.map.getProjection()
      });
    });
  }

  private extractGML2Data(res: Response) {
    let parser = new ol.format.GML2();
    let features = parser.readFeatures(res.text());

    // Handle non standard GML output (MapServer)
    if (features.length === 0) {
      parser = new ol.format.WMSGetFeatureInfo();
      features = parser.readFeatures(res.text());
    }

    return features.map(feature => this.featureToResult(feature));
  }

  private extractGML3Data(res: Response) {
    const parser = new ol.format.GML3();
    const features = parser.readFeatures(res.text());

    return features.map(feature => this.featureToResult(feature));
  }

  private extractGeoJSONData(res: Response) {
    return res.json().features;
  }

  private extractTextData(res: Response) {
    // TODO
    return [];
  }

  private featureToResult(feature: ol.Feature): SearchResult {
    const featureGeometry = (feature.getGeometry() as any);
    const properties = Object.assign({}, feature.getProperties());
    delete properties['geometry'];

    let geometry;
    if (featureGeometry !== undefined) {
      geometry = {
        type: featureGeometry.getType(),
        coordinates: featureGeometry.getCoordinates()
      };
    }

    return {
      id: undefined,
      source: undefined,
      type: SearchResultType.Feature,
      format: SearchResultFormat.GeoJSON,
      title: undefined,
      icon: 'place',
      projection: undefined,
      properties: properties,
      geometry: geometry
    };
  }

  private handleQueryResults(results: SearchResult[], layer: Layer) {
    this.store.dispatch({
      type: 'UPDATE_SEARCH_RESULTS',
      payload: {
        results: results,
        source: layer.title
      }
    });
  }
}

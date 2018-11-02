import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, concat, of, merge, zip, empty } from 'rxjs';

import { LanguageService, ConfigService } from '@igo2/core';
import { LayerOptions, CapabilitiesService } from '@igo2/geo';
import {
  Catalog,
  CatalogItem,
  CatalogItemLayer,
  CatalogItemGroup,
  CatalogServiceOptions
} from './catalog.interface';
import { CatalogItemType } from './catalog.enum';
import { scan, startWith, flatMap, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private languageService: LanguageService,
    private capabilitiesService: CapabilitiesService
  ) {}

  loadCatalogs(): Observable<Catalog[]> {
    const contextConfig = this.config.getConfig('context') || {};
    const catalogConfig = this.config.getConfig('catalog') || {} as CatalogServiceOptions;
    const apiUrl = catalogConfig.url || contextConfig.url;

    const catalogs = catalogConfig.sources || [];
    if (apiUrl === undefined) {
      return of(catalogs);
    }

    const baseLayers = [];
    if (catalogConfig.baseLayers) {
      const translate = this.languageService.translate;
      const title = translate.instant('igo.geo.CatalogTool.baseLayers');
      baseLayers.push({
        title: title,
        url: apiUrl + '/baselayers',
        type: 'baselayers'
      });
    }

    const catalogsUrl = apiUrl + '/catalogs';
    const request = this.http.get<Catalog[]>(catalogsUrl)
      .pipe(
        mergeMap(catalog => catalog)
      )

    const observables = [];
    if (baseLayers.length > 0) {
      observables.push(of(...baseLayers));
    }

    observables.push(request);

    if (catalogs.length > 0) {
      observables.push(of(...catalogs));
    }

    return zip(...observables);
  }

  loadCatalogItems(catalog: Catalog): Observable<CatalogItem[]> {
    if (catalog.type === 'baselayers') {
      return this.loadCatalogBaseLayerItems(catalog);
    }
    return this.loadCatalogWMSLayerItems(catalog);
  }

  private loadCatalogBaseLayerItems(catalog: Catalog): Observable<CatalogItemGroup[]> {
    const groupItem = {
      id: 'catalog.group.baselayers',
      type: CatalogItemType.Group,
      title: catalog.title,
      items: []
    };

    // TODO: I'm not sure this works
    return this.getCatalogBaseLayersOptions(catalog)
      .pipe(
        startWith(groupItem),
        scan((group: CatalogItemGroup, layerOptions: LayerOptions) => {
          group.items.push({
            id: `catalog.layer.${layerOptions.id || group.items.length}`,
            title: layerOptions.title,
            type: CatalogItemType.Layer,
            options: layerOptions
          } as CatalogItemLayer);

          return group;
        })
      );
  }

  private getCatalogBaseLayersOptions(catalog: Catalog): Observable<LayerOptions[]> {
    return this.http.get<LayerOptions[]>(catalog.url);
  }

  private loadCatalogWMSLayerItems(catalog: Catalog): Observable<CatalogItem[]> {
    return this.getCatalogWMSCapabilities(catalog)
      .pipe(
        startWith([]),
        scan((items: CatalogItem[], capabilities: any) => {
          this.includeRecursiveItems(catalog, capabilities.Capability.Layer, items);
          return items;
        })
      );
  }

  private getCatalogWMSCapabilities(catalog: Catalog): Observable<any> {
    return this.capabilitiesService.getCapabilities('wms', catalog.url);
  }

  /**
   * Dig in the layerList for each layer definition
   @param catalog: object of config.json parameter
   @param layerList: object of current level of layers
   @param groupsLayers: object of group of layers to show in the app
  */
  includeRecursiveItems(catalog: Catalog, layerList: any, items: CatalogItem[]) {
    // Dig all levels until last level (layer object are not defined on last level)
    for (const group of layerList.Layer) {
      if (group.Layer !== undefined) {
        // recursive, check next level
        this.includeRecursiveItems(catalog, group, items);
        continue;
      }

      // TODO: Split that into multiple methods
      // Define object of group layer
      const groupItem = {
        id: `catalog.group.${layerList.Name}`,
        type: CatalogItemType.Group,
        title: layerList.Title,
        // Add only layers with regFilter condition respected
        items: layerList.Layer.reduce((arrLayer, layer) => {
          let boolRegFilter = true;
          // Check for regex validation on layer's name
          if (catalog.regFilters !== undefined) {
            // Test layer.Name for each regex define in config.json
            for (const regFilter of catalog.regFilters) {
              boolRegFilter = new RegExp(regFilter).test(layer.Name);
              // If regex is respected, stop the for loop
              if (boolRegFilter === true) {
                break;
              }
            }
          }

          // If layer regex is okay (or not define), add the layer to the group
          if (boolRegFilter === true) {
            const timeFilter = this.capabilitiesService.getTimeFilter(layer);
            arrLayer.push({
              id: `catalog.layer.${layer.Name}`,
              type: CatalogItemType.Layer,
              title: layer.Title,
              properties: {},
              options: {
                title: layer.Title,
                sourceOptions: {
                  type: 'wms',
                  url: catalog.url,
                  params: {
                    layers: layer.Name
                  },
                  // Merge catalog time filter in layer timeFilter
                  timeFilter: { ...timeFilter, ...catalog.timeFilter }
                }
              }
            });
          }
          return arrLayer;
        }, [])

      };
      /* If object contain layers (when regFilters is define, the condition
      in Layer.map can define group with no layer) */
      if (groupItem.items.length !== 0) {
        items.push(groupItem);
      }
      // Break the group (don't add a group of layer for each of their layer!)
      break;
    }
  }

}

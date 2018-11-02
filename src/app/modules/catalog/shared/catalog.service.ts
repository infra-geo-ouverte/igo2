import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { LanguageService, ConfigService } from '@igo2/core';
import { LayerOptions, CapabilitiesService } from '@igo2/geo';
import { Catalog, CatalogItem, CatalogItemLayer, CatalogItemGroup } from './catalog.interface';
import { CatalogItemType } from './catalog.enum';
import { scan, startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  public catalog$ = new BehaviorSubject<Catalog>(undefined);
  public catalogs$ = new BehaviorSubject<Catalog[]>(undefined);
  private baseUrl: string;

  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private languageService: LanguageService,
    private capabilitiesService: CapabilitiesService
  ) {
    const options = this.config.getConfig('context') || {};

    this.baseUrl = options.url;
  }
  /*
  get(): Observable<Catalog[]> {
    const url = this.baseUrl + '/catalogs';
    return this.http.get<Catalog[]>(url);
  }

  getById(id: string): Observable<Catalog> {
    const url = this.baseUrl + '/catalogs/' + id;
    return this.http.get<Catalog>(url);
  }

  load() {
    const catalogConfig = this.config.getConfig('catalog') || {};

    if (!this.baseUrl) {
      if (catalogConfig.sources) {
        this.catalogs$.next(catalogConfig.sources);
      }
      return;
    }

    this.get().subscribe(catalogs => {
      if (catalogConfig.baseLayers) {
        const translate = this.languageService.translate;
        const title = translate.instant('igo.geo.CatalogTool.baseLayers');
        catalogs.unshift({
          title: title,
          url: this.baseUrl + '/baselayers',
          type: 'layers'
        });
      }
      if (catalogConfig.sources) {
        catalogs = catalogs.concat(catalogConfig.sources);
      }
      if (catalogs) {
        this.catalogs$.next(catalogs);
      }
    });
  }
  */
  loadCatalogItems(catalog: Catalog): Observable<CatalogItem[]> {
    if (catalog.type === 'layers') {
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
      )
  }

  private loadCatalogWMSLayerItems(catalog: Catalog): Observable<CatalogItem[]> {
    return this.getCatalogWMSCapabilities(catalog)
      .pipe(
        startWith([]),
        scan((items: CatalogItem[], capabilities: any) => {
          this.includeRecursiveItems(catalog, capabilities.Capability.Layer, items);
          return items
        })
      )
  }

  private getCatalogBaseLayersOptions(catalog: Catalog): Observable<LayerOptions[]> {
    return this.http.get<LayerOptions[]>(catalog.url);
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

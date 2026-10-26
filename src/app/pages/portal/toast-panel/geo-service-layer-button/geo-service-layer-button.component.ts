import {
  Component,
  DestroyRef,
  computed,
  inject,
  input,
  signal
} from '@angular/core';
import {
  takeUntilDestroyed,
  toObservable,
  toSignal
} from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { StopPropagationDirective } from '@igo2/common/stop-propagation';
import { IgoLanguageModule } from '@igo2/core/language';
import {
  Feature,
  GeoServiceDefinition,
  IgoMap,
  LayerService,
  PropertyTypeDetectorService,
  SearchResult,
  generateIdFromSourceOptions
} from '@igo2/geo';
import { ObjectUtils } from '@igo2/utils';

import { switchMap } from 'rxjs/operators';

interface ExtendedGeoServiceDefinition extends GeoServiceDefinition {
  propertyForUrl?: string;
}

/**
 * Adds or removes the map layer associated with the geo service of a selected search result.
 * The result acts as an index layer whose properties reference the actual layer(s) that can be added to the map.
 */
@Component({
  selector: 'app-geo-service-layer-button',
  templateUrl: './geo-service-layer-button.component.html',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    StopPropagationDirective,
    IgoLanguageModule
  ]
})
export class GeoServiceLayerButtonComponent {
  private propertyTypeDetectorService = inject(PropertyTypeDetectorService);
  private layerService = inject(LayerService);
  private destroyRef = inject(DestroyRef);

  readonly selection = input<SearchResult<Feature>>();
  readonly map = input.required<IgoMap>();

  loading = signal(false);

  private readonly layers = toSignal(
    toObservable(this.map).pipe(
      switchMap((map) => map.layerController.layers$)
    ),
    { initialValue: [] }
  );

  private readonly geoServices = computed(() => this.computeGeoServices());

  hasGeoService = computed(() => this.geoServices().length > 0);

  private readonly potentialLayer = computed(() => {
    const selection = this.selection();
    const geoService = this.geoServices()[0];
    if (!selection || !geoService) {
      return undefined;
    }
    const sourceOptions = this.computeSourceOptionsFromProperties(
      selection.data.properties,
      geoService
    );
    return {
      id: generateIdFromSourceOptions(sourceOptions.sourceOptions),
      sourceOptions
    };
  });

  layerAdded = computed(() => {
    const potentialLayer = this.potentialLayer();
    if (!potentialLayer) {
      return false;
    }
    return this.layers().some((layer) => layer.id === potentialLayer.id);
  });

  toggleLayer(): void {
    if (this.loading()) {
      return;
    }
    const potentialLayer = this.potentialLayer();
    if (!potentialLayer) {
      return;
    }

    if (this.layerAdded()) {
      const layerToRemove = this.map().layerController.getById(
        potentialLayer.id
      );
      if (layerToRemove) {
        this.map().layerController.remove(layerToRemove);
      }
      return;
    }

    this.loading.set(true);
    this.layerService
      .createAsyncLayer(potentialLayer.sourceOptions)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (layer) => {
          this.map().layersAddedByClick$.next([layer]);
          this.map().layerController.add(layer);
        },
        error: () => this.loading.set(false),
        complete: () => this.loading.set(false)
      });
  }

  private computeGeoServices(): ExtendedGeoServiceDefinition[] {
    const selection = this.selection();
    if (!selection) {
      return [];
    }
    const properties = selection.data.properties;
    const keys = Object.keys(properties);
    const geoServices: ExtendedGeoServiceDefinition[] = [];
    Object.entries(properties).forEach(([key, value]) => {
      const geoService = this.propertyTypeDetectorService.getGeoService(
        value,
        keys
      );
      if (geoService) {
        geoServices.push({ ...geoService, propertyForUrl: key });
      }
    });
    return geoServices;
  }

  private computeSourceOptionsFromProperties(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    properties: any,
    geoService: ExtendedGeoServiceDefinition
  ) {
    const keys = Object.keys(properties);
    const propertiesForLayerName = keys.filter((key) =>
      geoService.propertiesForLayerName.includes(key)
    );
    // providing the first matching regex
    const layerName = properties[propertiesForLayerName[0]];
    const url = properties[geoService.propertyForUrl ?? ''];
    let appliedLayerName = layerName;
    let arcgisLayerName: string | undefined;
    if (
      ['arcgisrest', 'imagearcgisrest', 'tilearcgisrest'].includes(
        geoService.type
      )
    ) {
      arcgisLayerName = layerName;
      appliedLayerName = undefined;
    }
    return ObjectUtils.removeUndefined({
      sourceOptions: {
        type: geoService.type || 'wms',
        url,
        optionsFromCapabilities: true,
        optionsFromApi: true,
        params: {
          LAYERS: appliedLayerName,
          LAYER: arcgisLayerName
        }
      }
    });
  }
}

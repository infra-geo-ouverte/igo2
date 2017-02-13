import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideStore } from '@ngrx/store';

import { browserMedia, mapView, mapLayers, selectedTool,
         availableTools, searchResults, selectedResult,
         focusedResult } from '../reducers';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { MediaService } from './media.service';
import { MapService } from './map.service';
import { ToolService } from './tool.service';
import { SearchService } from './search.service';
import { SearchAdapterService } from './search-adapter.service';
import { SearchAdapter } from '../search/adapters/search-adapter';
import { SearchAdapterNominatim } from '../search/adapters/search-adapter-nominatim';

export function searchAdapterServiceFactory(adapter: SearchAdapter) {
  return new SearchAdapterService(adapter);
}

export function provideSearchAdapterService() {
  return {
    provide: SearchAdapterService,
    useFactory: searchAdapterServiceFactory,
    deps: [SearchAdapter]
  };
}

export function provideSearchAdapter() {
  return {
    provide: SearchAdapter,
    useClass: SearchAdapterNominatim
  };
}

export function provideAppStore() {
  return provideStore({
    browserMedia,
    mapView,
    mapLayers,
    selectedTool,
    searchResults,
    selectedResult,
    focusedResult,
    availableTools
  });
}


@NgModule({
  imports: [
    CommonModule
  ],
  exports: [],
  declarations: []
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        MediaService,
        provideAppStore(),
        provideSearchAdapterService(),
        provideSearchAdapter(),
        MapService,
        SearchService,
        ToolService
      ]
    };
  }

  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}

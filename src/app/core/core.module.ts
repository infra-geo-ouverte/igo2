import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { Http, Jsonp } from '@angular/http';
import { CommonModule } from '@angular/common';

import { MissingTranslationHandler } from 'ng2-translate';

import { IgoMissingTranslationHandler } from './language/missing-translation.guard';
import { LanguageService } from './language/language.service';
import { throwIfAlreadyLoaded } from './module-import.guard';

import { provideStore } from '@ngrx/store';

import { browserMedia, mapView, mapLayers, selectedTool,
         availableTools, searchResults, selectedResult,
         focusedResult } from '../reducers';

import { MediaService } from './media.service';
import { MapService } from './map.service';

import { ToolService } from './tool.service';
import { SearchService } from './search.service';
import { SearchSourceService } from './search-source.service';
import { SearchSource } from '../search/sources/search-source';
import { SearchSourceNominatim } from '../search/sources/search-source-nominatim';
import { SearchSourceMSP } from '../search/sources/search-source-msp';

export function searchSourceServiceFactory(sources: SearchSource[]) {
  return new SearchSourceService(sources);
}

export function provideSearchSourceService() {
  return {
    provide: SearchSourceService,
    useFactory: searchSourceServiceFactory,
    deps: [SearchSource]
  };
}

export function provideSearchSource() {
  return [
    {
      provide: SearchSource,
      useClass: SearchSourceNominatim,
      multi: true,
      deps: [Http]
    },
    {
      provide: SearchSource,
      useClass: SearchSourceMSP,
      multi: true,
      deps: [Jsonp]
    }
  ];
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
        LanguageService,
        { provide: MissingTranslationHandler, useClass: IgoMissingTranslationHandler },
        MediaService,
        provideAppStore(),
        provideSearchSourceService(),
        MapService,
        SearchService,
        ToolService,
        ...provideSearchSource()
      ]
    };
  }

  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}

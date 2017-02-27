import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { Http, Jsonp } from '@angular/http';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

import { MissingTranslationHandler } from 'ng2-translate';

import { IgoMissingTranslationHandler } from './language/missing-translation.guard';
import { LanguageService } from './language/language.service';
import { throwIfAlreadyLoaded } from './module-import.guard';

import { provideStore } from '@ngrx/store';

import { activeContext, contextsList, mapView, mapLayers,
         selectedTool, toolsList, searchResults,
         selectedResult, focusedResult } from '../reducers';

import { MediaService } from './media.service';
import { LoggingService } from './logging.service';
import { RequestService } from './request.service';
import { MapService } from './map.service';
import { ToolService } from './tool.service';
import { SearchService } from './search.service';
import { SearchSourceService } from './search-source.service';
import { SearchSource } from '../search/sources/search-source';
import { SearchSourceNominatim } from '../search/sources/search-source-nominatim';
import { SearchSourceMSP } from '../search/sources/search-source-msp';

import { SpinnerComponent } from './spinner/spinner.component';

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
    activeContext: activeContext,
    contexts: contextsList,
    mapView: mapView,
    mapLayers: mapLayers,
    selectedTool: selectedTool,
    searchResults: searchResults,
    selectedResult: selectedResult,
    focusedResult: focusedResult,
    tools: toolsList
  });
}

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    SpinnerComponent
  ],
  declarations: [
    SpinnerComponent
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        LanguageService,
        { provide: MissingTranslationHandler, useClass: IgoMissingTranslationHandler },
        LoggingService,
        MediaService,
        RequestService,
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

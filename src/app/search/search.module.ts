import { NgModule } from '@angular/core';
import { Http, Jsonp } from '@angular/http';

import { SharedModule } from '../shared/shared.module';

import { SearchService } from './shared/search.service';
import { SearchSourceService } from './shared/search-source.service';
import { SearchSource } from './sources/search-source';
import { SearchSourceNominatim } from './sources/search-source-nominatim';
import { SearchSourceMSP } from './sources/search-source-msp';

import { SearchToolComponent } from './search-tool/search-tool.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SearchResultComponent } from './search-result/search-result.component';
import {
  SearchResultDetailsComponent
} from './search-result-details/search-result-details.component';

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

export function provideSearchSources() {
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

@NgModule({
  imports: [
    SharedModule
  ],
  exports: [
    SearchBarComponent,
    SearchResultDetailsComponent
  ],
  declarations: [
    SearchBarComponent,
    SearchResultComponent,
    SearchResultDetailsComponent,
    SearchToolComponent
  ],
  entryComponents: [SearchToolComponent],
  providers: [
    SearchService,
    provideSearchSourceService(),
    ...provideSearchSources()
  ]
})
export class SearchModule { }

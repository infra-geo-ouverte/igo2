/* tslint:disable:no-unused-variable */
import { TestBed, async, inject } from '@angular/core/testing';
import { SearchService } from './search.service';
import { HttpModule, JsonpModule } from '@angular/http';

import { searchResults } from '../reducers';
import {
   provideAppStore,
   provideSearchSource,
   provideSearchSourceService
} from './core.module';

describe('SearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        JsonpModule
      ],
      providers: [
        provideAppStore(),
        provideSearchSourceService(),
        provideSearchSource(),
        SearchService
      ]
    });
  });

  it('should ...', inject([SearchService], (service: SearchService) => {
    expect(service).toBeTruthy();
  }));
});

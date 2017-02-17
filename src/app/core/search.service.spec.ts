import { TestBed, inject } from '@angular/core/testing';

import { SearchService } from './search.service';
import { RequestService } from './request.service';
import { HttpModule, JsonpModule } from '@angular/http';

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
        SearchService,
        RequestService
      ]
    });
  });

  it('should ...', inject([SearchService], (service: SearchService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, async, inject } from '@angular/core/testing';
import { SearchService } from './search.service';
import { HttpModule } from '@angular/http';

import { searchResults } from '../reducers';
import {
   provideAppStore,
   provideSearchAdapter,
   provideSearchAdapterService
} from './core.module';

describe('SearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
        provideAppStore(),
        provideSearchAdapterService(),
        provideSearchAdapter(),
        SearchService
      ]
    });
  });

  it('should ...', inject([SearchService], (service: SearchService) => {
    expect(service).toBeTruthy();
  }));
});

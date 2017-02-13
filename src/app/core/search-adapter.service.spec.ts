/* tslint:disable:no-unused-variable */
import { TestBed, async, inject } from '@angular/core/testing';
import { SearchAdapterService } from './search-adapter.service';

import {
   provideSearchAdapter,
   provideSearchAdapterService
} from './core.module';

describe('SearchAdapterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideSearchAdapterService(),
        provideSearchAdapter()
      ]
    });
  });

  it('should ...', inject([SearchAdapterService], (service: SearchAdapterService) => {
    expect(service).toBeTruthy();
  }));
});

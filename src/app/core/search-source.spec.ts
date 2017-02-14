/* tslint:disable:no-unused-variable */
import { TestBed, async, inject } from '@angular/core/testing';
import { SearchSourceService } from './search-source.service';

import {
   provideSearchSource,
   provideSearchSourceService
} from './core.module';

describe('SearchSourceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideSearchSourceService(),
        provideSearchSource()
      ]
    });
  });

  it('should ...', inject([SearchSourceService], (service: SearchSourceService) => {
    expect(service).toBeTruthy();
  }));
});

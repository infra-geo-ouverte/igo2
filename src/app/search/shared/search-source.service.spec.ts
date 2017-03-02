import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, JsonpModule } from '@angular/http';

import { SearchSourceService } from './search-source.service';
import {
  provideSearchSources,
  provideSearchSourceService
} from '../search.module';

describe('SearchSourceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        JsonpModule
      ],
      providers: [
        provideSearchSourceService(),
        ...provideSearchSources()
      ]
    });
  });

  it('should ...', inject([SearchSourceService], (service: SearchSourceService) => {
    expect(service).toBeTruthy();
  }));
});

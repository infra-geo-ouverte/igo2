
import { TestBed, async, inject } from '@angular/core/testing';
import { HttpModule, JsonpModule } from '@angular/http';
import { SearchSourceService } from './search-source.service';

import {
   provideSearchSource,
   provideSearchSourceService
} from './core.module';

describe('SearchSourceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        JsonpModule
      ],
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

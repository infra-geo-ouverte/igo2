import { TestBed, inject } from '@angular/core/testing';

import { TestModule } from '../../test.module';

import { SearchService } from './search.service';
import {
  provideSearchSources,
  provideSearchSourceService
} from '../search.module';

describe('SearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule
      ],
      providers: [
        SearchService,
        provideSearchSourceService(),
        ...provideSearchSources(),
      ]
    });
  });

  it('should ...', inject([SearchService], (service: SearchService) => {
    expect(service).toBeTruthy();
  }));
});

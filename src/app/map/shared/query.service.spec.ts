import { TestBed, inject } from '@angular/core/testing';

import { TestModule } from '../../test.module';

import { QueryService } from './query.service';

describe('QueryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule
      ],
      providers: [
        QueryService
      ]
    });
  });

  it('should ...', inject([QueryService], (service: QueryService) => {
    expect(service).toBeTruthy();
  }));
});

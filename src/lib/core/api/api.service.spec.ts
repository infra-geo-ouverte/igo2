import { TestBed, inject } from '@angular/core/testing';
import { IgoConfigModule } from '@igo2/core';

import { ApiService } from './api.service';

describe('ApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IgoConfigModule],
      providers: [ApiService]
    });
  });

  it(
    'should ...',
    inject([ApiService], (service: ApiService) => {
      expect(service).toBeTruthy();
    })
  );
});

import { TestBed, inject } from '@angular/core/testing';

import { LoggingService } from './logging.service';
import { RequestService } from './request.service';

describe('RequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoggingService,
        RequestService
      ]
    });
  });

  it('should ...', inject([RequestService], (service: RequestService) => {
    expect(service).toBeTruthy();
  }));
});

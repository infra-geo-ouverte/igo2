import { TestBed, inject } from '@angular/core/testing';
import { LoggingService } from './logging.service';

describe('LoggingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoggingService]
    });
  });

  it('should ...', inject([LoggingService], (service: LoggingService) => {
    expect(service).toBeTruthy();
  }));
});

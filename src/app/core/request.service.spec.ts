import { TestBed, inject } from '@angular/core/testing';
import { RequestService } from './request.service';

describe('RequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequestService]
    });
  });

  it('should ...', inject([RequestService], (service: RequestService) => {
    expect(service).toBeTruthy();
  }));
});

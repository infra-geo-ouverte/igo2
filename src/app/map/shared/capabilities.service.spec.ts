import { TestBed, inject } from '@angular/core/testing';

import { TestModule } from '../../test.module';

import { CapabilitiesService } from './capabilities.service';

describe('CapabilitiesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule
      ],
      providers: [
        CapabilitiesService
      ]
    });
  });

  it('should ...', inject([CapabilitiesService], (service: CapabilitiesService) => {
    expect(service).toBeTruthy();
  }));
});

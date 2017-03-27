import { TestBed, inject } from '@angular/core/testing';

import { TestModule } from '../../test.module';

import { MapService } from './map.service';

describe('MapService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule
      ],
      providers: [
        MapService
      ]
    });
  });

  it('should ...', inject([MapService], (service: MapService) => {
    expect(service).toBeTruthy();
  }));
});

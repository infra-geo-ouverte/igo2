import { TestBed, inject } from '@angular/core/testing';
import { MapService } from './map.service';

import { TestModule } from '../../test.module';

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

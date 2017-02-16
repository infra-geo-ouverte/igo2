import { TestBed, inject } from '@angular/core/testing';
import { MapService } from './map.service';

import { provideAppStore } from './core.module';

describe('MapService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MapService,
        provideAppStore()
      ]
    });
  });

  it('should ...', inject([MapService], (service: MapService) => {
    expect(service).toBeTruthy();
  }));
});

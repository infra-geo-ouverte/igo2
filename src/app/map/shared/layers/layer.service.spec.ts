/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LayerService } from './layer.service';

describe('LayerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LayerService]
    });
  });

  it('should ...', inject([LayerService], (service: LayerService) => {
    expect(service).toBeTruthy();
  }));
});

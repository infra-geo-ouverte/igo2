import { TestBed, inject } from '@angular/core/testing';

import { provideIgoStore } from '../store/store.module';

import { MediaService } from './media.service';

describe('MediaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideIgoStore(),
        MediaService
      ]
    });
  });

  it('should ...', inject([MediaService], (service: MediaService) => {
    expect(service).toBeTruthy();
  }));
});

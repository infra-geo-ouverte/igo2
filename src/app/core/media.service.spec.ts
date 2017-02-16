import { TestBed, inject } from '@angular/core/testing';
import { MediaService } from './media.service';
import { provideAppStore } from './core.module';

describe('MediaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideAppStore(),
        MediaService
      ]
    });
  });

  it('should ...', inject([MediaService], (service: MediaService) => {
    expect(service).toBeTruthy();
  }));
});

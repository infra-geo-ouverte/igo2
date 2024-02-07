import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { WelcomeWindowService } from './welcome-window.service';

describe('WelcomeWindowService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    })
  );

  it('should be created', () => {
    const service: WelcomeWindowService = TestBed.inject(WelcomeWindowService);
    expect(service).toBeTruthy();
  });
});

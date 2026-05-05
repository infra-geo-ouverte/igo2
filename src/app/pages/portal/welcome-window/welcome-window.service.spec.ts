import { TestBed } from '@angular/core/testing';

import { mergeTestConfig } from '../../../../test.config';
import { WelcomeWindowService } from './welcome-window.service';

describe('WelcomeWindowService', () => {
  beforeEach(() => TestBed.configureTestingModule(mergeTestConfig({})));

  it('should be created', () => {
    const service: WelcomeWindowService = TestBed.inject(WelcomeWindowService);
    expect(service).toBeTruthy();
  });
});

/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ContextService } from './context.service';

import { ToolService } from './tool.service';
import { provideAppStore } from './core.module';

describe('ContextService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ContextService,
        ToolService,
        provideAppStore()
      ]
    });
  });

  it('should ...', inject([ContextService], (service: ContextService) => {
    expect(service).toBeTruthy();
  }));
});

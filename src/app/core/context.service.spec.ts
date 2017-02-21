import { TestBed, inject } from '@angular/core/testing';
import { ContextService } from './context.service';
import { HttpModule } from '@angular/http';

import { LoggingService } from './logging.service';
import { RequestService } from './request.service';
import { ToolService } from './tool.service';
import { provideAppStore } from './core.module';

describe('ContextService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
        LoggingService,
        RequestService,
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

import { TestBed, inject } from '@angular/core/testing';

import { TestModule } from '../../test.module';
import { ToolService } from '../../tool/shared/tool.service';

import { ContextService } from './context.service';

describe('ContextService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule
      ],
      providers: [
        ContextService,
        ToolService
      ]
    });
  });

  it('should ...', inject([ContextService], (service: ContextService) => {
    expect(service).toBeTruthy();
  }));
});

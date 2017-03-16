import { TestBed, inject } from '@angular/core/testing';

import { TestModule } from '../test.module';

import { LoggingService } from './logging/logging.service';
import { MessageService } from './message/message.service';

import { RequestService } from './request.service';

describe('RequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule
      ],
      providers: [
        LoggingService,
        MessageService,
        RequestService
      ]
    });
  });

  it('should ...', inject([RequestService], (service: RequestService) => {
    expect(service).toBeTruthy();
  }));
});

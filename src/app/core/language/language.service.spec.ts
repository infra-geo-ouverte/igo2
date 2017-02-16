import { TestBed, async, inject } from '@angular/core/testing';
import { LanguageService } from './language.service';
import { TestModule } from '../../test.module';

describe('LanguageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [LanguageService]
    });
  });

  it('should ...', inject([LanguageService], (service: LanguageService) => {
    expect(service).toBeTruthy();
  }));
});

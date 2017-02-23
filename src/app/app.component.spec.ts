import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LanguageService } from './core/language/language.service';

import { TestModule } from './test.module';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './core/spinner/spinner.component';
import { NavigatorModule, NavigatorRoutingModule } from './pages';
import { MediaService } from './core/media.service';
import { RequestService } from './core/request.service';
import { LoggingService } from './core/logging.service';
import { provideAppStore } from './core/core.module';

import {} from 'jasmine';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NavigatorModule,
        TestModule,
        NavigatorRoutingModule
      ],
      declarations: [
        AppComponent,
        SpinnerComponent
      ],
      providers: [
        LanguageService,
        provideAppStore(),
        MediaService,
        LoggingService,
        RequestService
      ]
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});

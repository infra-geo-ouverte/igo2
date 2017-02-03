import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LanguageService } from './core/language/language.service';

import { TestModule } from './test.module';
import { AppComponent } from './app.component';
import { NavigatorModule, NavigatorRoutingModule } from './pages';

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
        AppComponent
      ],
      providers: [LanguageService]
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});

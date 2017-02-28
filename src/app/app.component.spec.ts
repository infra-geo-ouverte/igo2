import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TestModule } from './test.module';

import { LanguageService } from './core/language/language.service';

import { NavigatorModule, NavigatorRoutingModule } from './pages';

import { AppComponent } from './app.component';
import { SpinnerComponent } from './core/spinner/spinner.component';


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
        LanguageService
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

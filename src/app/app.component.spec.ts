import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SimpleNotificationsModule } from 'angular2-notifications';

import { TestModule } from './test.module';

import { LanguageService } from './core/language/language.service';

import { NavigatorModule, NavigatorRoutingModule } from './pages';

import { AppComponent } from './app.component';
import { SpinnerComponent } from './core/spinner/spinner.component';
import { MessageComponent } from './core/message/message.component';

import {} from 'jasmine';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NavigatorModule,
        TestModule,
        NavigatorRoutingModule,
        SimpleNotificationsModule.forRoot()
      ],
      declarations: [
        AppComponent,
        SpinnerComponent,
        MessageComponent
      ],
      providers: [
        LanguageService
      ]
    });
    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

});

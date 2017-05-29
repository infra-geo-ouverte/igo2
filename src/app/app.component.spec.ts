import { TestBed, async } from '@angular/core/testing';

import { IgoModule, provideSearchSourceOptions,
         provideNominatimSearchSource } from 'igo2';

import { SharedModule } from './shared';
import { PortalModule } from './pages';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        IgoModule.forRoot(),

        SharedModule,
        PortalModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        provideSearchSourceOptions({
          limit: 5
        }),
        provideNominatimSearchSource(),
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});

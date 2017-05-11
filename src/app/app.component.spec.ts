import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { IgoModule } from 'igo2';

import { SharedModule } from './shared';
import { PortalModule, PortalRoutingModule } from './pages';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        IgoModule.forRoot(),

        SharedModule,
        PortalModule,
        PortalRoutingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: []
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});

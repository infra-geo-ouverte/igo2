import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { NavigatorModule, NavigatorRoutingModule } from './pages';
import { MediaService } from './core/media.service';
import { provideAppStore } from './core/core.module';

import {} from 'jasmine';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NavigatorModule,
        NavigatorRoutingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        provideAppStore(),
        MediaService
      ]
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'igo works!'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('igo works!');
  }));
});

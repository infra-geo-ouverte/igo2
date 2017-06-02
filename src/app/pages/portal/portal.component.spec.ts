import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { IgoModule,
         provideIChercheSearchSource,
         provideNominatimSearchSource,
         provideDataSourceSearchSource,
         LanguageLoader, provideLanguageLoader} from 'igo2';

import { SharedModule } from '../../shared';
import { SidenavComponent } from './sidenav';
import { ToastComponent } from './toast';

import { PortalComponent } from './portal.component';

export function languageLoader(http: Http) {
  return new LanguageLoader(http, './assets/locale/', '.json');
}

describe('PortalComponent', () => {
  let component: PortalComponent;
  let fixture: ComponentFixture<PortalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        IgoModule.forRoot(),
        SharedModule
      ],
      declarations: [
        PortalComponent,
        SidenavComponent,
        ToastComponent
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue : '/' },
        {
          provide: ActivatedRoute,
          useValue: {
            params: Observable.of({zoom: 8})
          }
        },
        provideNominatimSearchSource(),
        provideIChercheSearchSource(),
        provideDataSourceSearchSource(),
        provideLanguageLoader(languageLoader)
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have a search bar`, async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('igo-search-bar')).toBeTruthy();
  }));
});

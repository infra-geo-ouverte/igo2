import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Http } from '@angular/http';

import { IgoModule, provideDefaultSearchSources,
         LanguageLoader, provideLanguageService } from 'igo2';

import { SharedModule } from '../../shared';
import { SidenavComponent } from './sidenav';
import { ToastComponent } from './toast';

import { PortalComponent } from './portal.component';

export function translateLoader(http: Http) {
  return new LanguageLoader(http, './assets/locale/', '.json');
}

describe('PortalComponent', () => {
  let component: PortalComponent;
  let fixture: ComponentFixture<PortalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
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
        provideLanguageService({
          loader: translateLoader
        }),
        ...provideDefaultSearchSources(),
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

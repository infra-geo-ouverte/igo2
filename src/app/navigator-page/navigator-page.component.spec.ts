/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { MapModule } from '../map/map.module';
import { SearchModule } from '../search/search.module';

import { NavigatorPageComponent } from './navigator-page.component';
import { SidenavComponent } from './sidenav/sidenav.component';

describe('NavigatorPageComponent', () => {
  let component: NavigatorPageComponent;
  let fixture: ComponentFixture<NavigatorPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MapModule,
        SearchModule,
        SharedModule,

      ],
      declarations: [
        NavigatorPageComponent,
        SidenavComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigatorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

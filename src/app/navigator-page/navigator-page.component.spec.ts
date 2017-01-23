/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NavigatorPageComponent } from './navigator-page.component';
import { MapModule } from '../map/map.module';

describe('NavigatorPageComponent', () => {
  let component: NavigatorPageComponent;
  let fixture: ComponentFixture<NavigatorPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MapModule],
      declarations: [ NavigatorPageComponent ]
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

/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FlexPaneComponent } from './flex-pane.component';

describe('FlexPaneComponent', () => {
  let component: FlexPaneComponent;
  let fixture: ComponentFixture<FlexPaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlexPaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlexPaneComponent);
    component = fixture.componentInstance;
  });

  it('should raise an error because there is no main directive', () => {
    expect(
      function() {
        component.ngOnInit();
    }).toThrowError('No main directive found.');
  });
});

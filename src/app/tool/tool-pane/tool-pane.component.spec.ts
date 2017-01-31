/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ToolPaneComponent } from './tool-pane.component';

describe('ToolPaneComponent', () => {
  let component: ToolPaneComponent;
  let fixture: ComponentFixture<ToolPaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolPaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolPaneComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.tool = {
      title: 'foo',
      name: 'bar',
      icon: 'icon'
    };

    expect(component).toBeTruthy();
  });
});

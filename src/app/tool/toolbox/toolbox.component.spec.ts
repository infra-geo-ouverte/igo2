/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ToolboxComponent } from './toolbox.component';
import { ToolService } from '../../core/tool.service';

// We don't want to import external tool. We'll have to think of
// different tests for this component
import { SearchToolComponent } from '../../search/search-tool/search-tool.component';
import { SearchResultsComponent } from '../../search/search-results/search-results.component';

describe('ToolboxComponent', () => {
  let component: ToolboxComponent;
  let fixture: ComponentFixture<ToolboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ToolboxComponent,
        SearchToolComponent,
        SearchResultsComponent
      ],
      providers: [
        ToolService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

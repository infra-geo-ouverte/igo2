/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { provideStore } from '@ngrx/store';

import { TestModule } from '../../test.module';
import { SharedModule } from '../../shared/shared.module';
import { MapModule } from '../../map/map.module';
import { SearchModule } from '../../search/search.module';
import { ToolModule } from '../../tool/tool.module';
import { ToolService } from '../../core/tool.service';
import { selectedTool } from '../../reducers';
import { NavigatorComponent } from './navigator.component';

describe('NavigatorComponent', () => {
  let component: NavigatorComponent;
  let fixture: ComponentFixture<NavigatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule,
        MapModule,
        SearchModule,
        ToolModule,
        SharedModule
      ],
      declarations: [
        NavigatorComponent
      ],
      providers: [
        provideStore({ selectedTool }),
        ToolService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MaterialModule } from '@angular/material';

import {
   provideAppStore,
   provideSearchSource,
   provideSearchSourceService
} from '../../core/core.module';
import { MapService } from '../../core/map.service';
import { LayerService } from '../../map/shared/layer.service';
import { SearchService } from '../../core/search.service';

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
        MapModule,
        SearchModule,
        ToolModule,
        MaterialModule.forRoot(),
        SharedModule
      ],
      declarations: [
        NavigatorComponent
      ],
      providers: [
        provideAppStore(),
        provideSearchSourceService(),
        provideSearchSource(),
        MapService,
        LayerService,
        SearchService,
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

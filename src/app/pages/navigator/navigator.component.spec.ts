import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';

import {
   provideAppStore,
   provideSearchSource,
   provideSearchSourceService
} from '../../core/core.module';
import { MapService } from '../../core/map.service';
import { LayerService } from '../../map/shared/layer.service';
import { SearchService } from '../../core/search.service';
import { LoggingService } from '../../core/logging.service';
import { RequestService } from '../../core/request.service';
import { MediaService } from '../../core/media.service';

import { TestModule } from '../../test.module';
import { SharedModule } from '../../shared/shared.module';
import { MapModule } from '../../map/map.module';
import { SearchModule } from '../../search/search.module';
import { ToolModule } from '../../tool/tool.module';
import { ToolService } from '../../core/tool.service';
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
        SharedModule,
        RouterModule.forRoot([])
      ],
      declarations: [
        NavigatorComponent
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue : '/' },
        provideAppStore(),
        provideSearchSourceService(),
        provideSearchSource(),
        MapService,
        LayerService,
        SearchService,
        ToolService,
        LoggingService,
        RequestService,
        MediaService
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

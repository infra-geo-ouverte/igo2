import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestModule } from '../../test.module';

import { provideAppStore } from '../../core/core.module';
import { MapService } from '../../core/map.service';
import { LayerService } from '../shared/layer.service';
import { NgMap } from '../shared/map';
import { ZoomComponent } from '../zoom/zoom.component';
import { MapComponent } from './map.component';

import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions } from '@angular/http';

const mockHttpProvider = {
    deps: [ MockBackend, BaseRequestOptions ],
    useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
        return new Http(backend, defaultOptions);
    }
};

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule
      ],
      declarations: [
        ZoomComponent,
        MapComponent
      ],
      providers: [
        {provide: Http, useValue: mockHttpProvider},
        provideAppStore(),
        MapService,
        LayerService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.map = new NgMap();
    component.ngAfterViewInit();
    expect(component).toBeTruthy();
  });
});

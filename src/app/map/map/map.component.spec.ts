import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions } from '@angular/http';

import { TestModule } from '../../test.module';

import { MapService } from '../shared/map.service';
import { LayerService } from '../shared/layer.service';
import { CapabilitiesService } from '../shared/capabilities.service';
import { IgoMap } from '../shared/map';
import { ZoomComponent } from '../zoom/zoom.component';
import { MapComponent } from './map.component';

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
        MapService,
        LayerService,
        CapabilitiesService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.map = new IgoMap();
    component.ngAfterViewInit();
    expect(component).toBeTruthy();
  });
});

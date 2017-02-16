import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialModule } from '@angular/material';

import { provideAppStore } from '../../core/core.module';
import { MapService } from '../../core/map.service';
import { LayerService } from '../shared/layer.service';
import { NgMap } from '../shared/map';
import { ZoomComponent } from '../zoom/zoom.component';
import { MapComponent } from './map.component';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule.forRoot()
      ],
      declarations: [
        ZoomComponent,
        MapComponent
      ],
      providers: [
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

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestModule } from '../../test.module';
import { SharedModule } from '../../shared/shared.module';

import { IgoMap } from '../shared/map';
import { MapService } from '../shared/map.service';
import { LayerService } from '../shared/layer.service';
import { MapEditorComponent } from './map-editor.component';
import { LayerListComponent } from '../layer-list/layer-list.component';
import { LayerListItemComponent } from '../layer-list-item/layer-list-item.component';
import { LayerLegendComponent } from '../layer-legend/layer-legend.component';

describe('MapEditorComponent', () => {
  let component: MapEditorComponent;
  let fixture: ComponentFixture<MapEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule,
        SharedModule
      ],
      declarations: [
        MapEditorComponent,
        LayerListComponent,
        LayerListItemComponent,
        LayerLegendComponent
      ],
      providers: [
        MapService,
        LayerService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapEditorComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.map = new IgoMap();
    expect(component).toBeTruthy();
  });
});

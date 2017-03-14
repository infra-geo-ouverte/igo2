import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestModule } from '../../test.module';
import { SharedModule } from '../../shared/shared.module';

import { OSMLayer } from '../shared/layers/layer-osm';
import { LayerLegendComponent } from './layer-legend.component';

describe('LayerLegendComponent', () => {
  let component: LayerLegendComponent;
  let fixture: ComponentFixture<LayerLegendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule,
        SharedModule
      ],
      declarations: [ LayerLegendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerLegendComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.layer = new OSMLayer({title: 'foo', type: 'osm'});
    expect(component).toBeTruthy();
  });
});

import { async, TestBed } from '@angular/core/testing';
// import { ComponentFixture } from '@angular/core/testing';

import { TestModule } from '../../test.module';
import { SharedModule } from '../../shared/shared.module';

// import { OSMLayer } from '../shared/layers/layer-osm';
import { LayerListItemComponent } from './layer-list-item.component';
import { LayerLegendComponent } from '../layer-legend/layer-legend.component';

describe('LayerListItemComponent', () => {
  // let component: LayerListItemComponent;
  // let fixture: ComponentFixture<LayerListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule,
        SharedModule
      ],
      declarations: [
        LayerListItemComponent,
        LayerLegendComponent
      ]
    })
    .compileComponents();
  }));

  /*
  beforeEach(() => {
    fixture = TestBed.createComponent(LayerListItemComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.layer = new OSMLayer({title: 'foo', type: 'osm'});
    expect(component).toBeTruthy();
  });*/
});

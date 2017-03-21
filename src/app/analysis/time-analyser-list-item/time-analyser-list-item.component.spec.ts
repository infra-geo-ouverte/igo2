import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedModule } from '../../shared/shared.module';

import { OSMLayer } from '../../map/shared/layers/layer-osm';

import { TimeAnalyserListItemComponent } from './time-analyser-list-item.component';
import {
  TimeAnalyserFormComponent
} from '../time-analyser-form/time-analyser-form.component';

describe('TimeAnalyserItemComponent', () => {
  let component: TimeAnalyserListItemComponent;
  let fixture: ComponentFixture<TimeAnalyserListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ],
      declarations: [
        TimeAnalyserListItemComponent,
        TimeAnalyserFormComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeAnalyserListItemComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    const layer = new OSMLayer({
      title: 'OSM',
      type: 'osm',
      timeFilter: {
        min: '2017-01-01',
        max: '2017-01-31'
      }
    });
    component.layer = layer;
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Md2Module } from 'md2';

import { SharedModule } from '../../shared/shared.module';

import { WMSLayer } from '../../map/shared/layers/layer-wms';

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
        SharedModule,
        Md2Module
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
    const layer = new WMSLayer({
      title: 'WMS',
      type: 'wms',
      source: {
        url: 'foo',
        projection: 'EPSG:3857',
        params: {
          layers: 'bar'
        }
      },
      timeFilter: {
        min: '2017-01-01',
        max: '2017-01-31'
      }
    });
    component.layer = layer;
    expect(component).toBeTruthy();
  });
});

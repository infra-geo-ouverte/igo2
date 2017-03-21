import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedModule } from '../../shared/shared.module';

import { MapService } from '../../map/shared/map.service';

import { TimeAnalyserComponent } from './time-analyser.component';
import {
  TimeAnalyserListComponent
} from '../time-analyser-list/time-analyser-list.component';
import {
  TimeAnalyserListItemComponent
} from '../time-analyser-list-item/time-analyser-list-item.component';
import {
  TimeAnalyserFormComponent
} from '../time-analyser-form/time-analyser-form.component';

describe('TimeAnalyserComponent', () => {
  let component: TimeAnalyserComponent;
  let fixture: ComponentFixture<TimeAnalyserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ],
      declarations: [
        TimeAnalyserComponent,
        TimeAnalyserListComponent,
        TimeAnalyserListItemComponent,
        TimeAnalyserFormComponent
      ],
      providers: [
        MapService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeAnalyserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

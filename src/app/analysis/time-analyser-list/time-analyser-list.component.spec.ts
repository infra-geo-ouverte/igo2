import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Md2Module } from 'md2';

import { SharedModule } from '../../shared/shared.module';
import { IgoMap } from '../../map/shared/map';

import { TimeAnalyserListComponent } from './time-analyser-list.component';
import {
  TimeAnalyserListItemComponent
} from '../time-analyser-list-item/time-analyser-list-item.component';
import {
  TimeAnalyserFormComponent
} from '../time-analyser-form/time-analyser-form.component';

describe('TimeAnalyserListComponent', () => {
  let component: TimeAnalyserListComponent;
  let fixture: ComponentFixture<TimeAnalyserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        Md2Module
      ],
      declarations: [
        TimeAnalyserListComponent,
        TimeAnalyserListItemComponent,
        TimeAnalyserFormComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeAnalyserListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.map = new IgoMap();
    expect(component).toBeTruthy();
  });
});

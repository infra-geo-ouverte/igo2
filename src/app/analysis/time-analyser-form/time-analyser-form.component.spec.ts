import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Md2Module } from 'md2';

import { SharedModule } from '../../shared/shared.module';

import { TimeAnalyserFormComponent } from './time-analyser-form.component';

describe('TimeAnalyserFormComponent', () => {
  let component: TimeAnalyserFormComponent;
  let fixture: ComponentFixture<TimeAnalyserFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        Md2Module
      ],
      declarations: [ TimeAnalyserFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeAnalyserFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.options = {
      min: '2017-01-01',
      max: '2017-01-31'
    };
    expect(component).toBeTruthy();
  });
});

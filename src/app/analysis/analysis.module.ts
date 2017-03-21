import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { TimeAnalyserComponent } from './time-analyser/time-analyser.component';
import { TimeAnalyserFormComponent } from './time-analyser-form/time-analyser-form.component';
import {
  TimeAnalyserListItemComponent
} from './time-analyser-list-item/time-analyser-list-item.component';
import {
  TimeAnalyserListComponent
} from './time-analyser-list/time-analyser-list.component';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [
    TimeAnalyserComponent,
    TimeAnalyserListItemComponent,
    TimeAnalyserListComponent,
    TimeAnalyserFormComponent
  ],
  entryComponents: [
    TimeAnalyserComponent
  ]
})
export class AnalysisModule { }

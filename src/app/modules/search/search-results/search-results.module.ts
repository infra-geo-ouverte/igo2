import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatTooltipModule,
  MatIconModule,
  MatListModule
} from '@angular/material';

import {
  IgoKeyValueModule,
  IgoCollapsibleModule,
  IgoListModule
} from '@igo2/common';
import { IgoLanguageModule } from '@igo2/core';

import { RecordGroupPipe } from './record-group.pipe';
import { SearchResultsComponent } from './search-results.component';
import { SearchResultComponent } from './search-result.component';

@NgModule({
  imports: [
    CommonModule,
    MatTooltipModule,
    MatIconModule,
    MatListModule,
    IgoKeyValueModule,
    IgoCollapsibleModule,
    IgoListModule,
    IgoLanguageModule
  ],
  exports: [
    SearchResultsComponent
  ],
  declarations: [
    RecordGroupPipe,
    SearchResultsComponent,
    SearchResultComponent
  ]
})
export class FadqSearchResultsModule {}

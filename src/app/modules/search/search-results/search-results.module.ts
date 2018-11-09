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

import { SearchEntityGroupPipe } from './search-entity-group.pipe';
import { SearchResultsComponent } from './search-results.component';
import { SearchResultsItemComponent } from './search-results-item.component';

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
    SearchEntityGroupPipe,
    SearchResultsComponent,
    SearchResultsItemComponent
  ]
})
export class FadqSearchResultsModule {}

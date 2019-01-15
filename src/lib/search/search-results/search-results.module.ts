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

import { SearchResultsGroupPipe } from './search-results-group.pipe';
import { SearchResultsComponent } from './search-results.component';
import { SearchResultsItemComponent } from './search-results-item.component';

/**
 * @ignore
 */
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
    SearchResultsGroupPipe,
    SearchResultsComponent,
    SearchResultsItemComponent
  ]
})
export class FadqLibSearchResultsModule {}

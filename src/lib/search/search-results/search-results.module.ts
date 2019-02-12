import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatTooltipModule,
  MatIconModule,
  MatListModule
} from '@angular/material';

import {
  IgoCollapsibleModule,
  IgoListModule
} from '@igo2/common';
import { IgoLanguageModule } from '@igo2/core';

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
    IgoCollapsibleModule,
    IgoListModule,
    IgoLanguageModule
  ],
  exports: [
    SearchResultsComponent
  ],
  declarations: [
    SearchResultsComponent,
    SearchResultsItemComponent
  ]
})
export class FadqLibSearchResultsModule {}

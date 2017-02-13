import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SearchResultComponent } from './search-result/search-result.component';
import {
  SearchResultDetailsComponent
} from './search-result-details/search-result-details.component';
import { SearchToolComponent } from './search-tool/search-tool.component';

@NgModule({
  imports: [
    SharedModule
  ],
  exports: [
    SearchBarComponent,
    SearchResultDetailsComponent
  ],
  declarations: [
    SearchBarComponent,
    SearchResultComponent,
    SearchResultDetailsComponent,
    SearchToolComponent
  ]
})
export class SearchModule { }

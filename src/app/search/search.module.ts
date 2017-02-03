import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { SearchToolComponent } from './search-tool/search-tool.component';

@NgModule({
  imports: [
    SharedModule
  ],
  exports: [SearchBarComponent],
  declarations: [
    SearchBarComponent,
    SearchResultsComponent,
    SearchToolComponent
  ]
})
export class SearchModule { }

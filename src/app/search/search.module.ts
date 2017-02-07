import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { SearchToolComponent } from './search-tool/search-tool.component';

@NgModule({
  imports: [
    SharedModule
  ],
  exports: [SearchBarComponent],
  declarations: [
    SearchBarComponent,
    SearchResultComponent,
    SearchToolComponent
  ]
})
export class SearchModule { }

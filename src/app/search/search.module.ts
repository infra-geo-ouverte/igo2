import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { SearchBarComponent } from './search-bar/search-bar.component';

@NgModule({
  imports: [
    SharedModule
  ],
  exports: [SearchBarComponent],
  declarations: [SearchBarComponent]
})
export class SearchModule { }

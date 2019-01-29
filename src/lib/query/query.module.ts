import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QueryableDirective } from './queryable/queryable.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    QueryableDirective
  ],
  declarations: [
    QueryableDirective
  ],
  providers: []
})
export class FadqLibQueryModule {}

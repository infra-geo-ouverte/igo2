import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FadqEntityTableModule } from './entity-table/entity-table.module';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    FadqEntityTableModule
  ],
  declarations: []
})
export class FadqEntityModule {}

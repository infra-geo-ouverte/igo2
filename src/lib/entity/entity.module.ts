import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FadqLibEntityTableModule } from './entity-table/entity-table.module';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    FadqLibEntityTableModule
  ],
  declarations: []
})
export class FadqLibEntityModule {}

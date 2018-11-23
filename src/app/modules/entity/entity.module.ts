import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FadqEntityFormModule } from './entity-form/entity-form.module';
import { FadqEntityTableModule } from './entity-table/entity-table.module';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    FadqEntityFormModule,
    FadqEntityTableModule
  ],
  declarations: []
})
export class FadqEntityModule {}

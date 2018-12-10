import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FadqLibEntityFormModule } from './entity-form/entity-form.module';
import { FadqLibEntityTableModule } from './entity-table/entity-table.module';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    FadqLibEntityFormModule,
    FadqLibEntityTableModule
  ],
  declarations: []
})
export class FadqLibEntityModule {}

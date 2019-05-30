import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  IgoActionModule,
  IgoDynamicComponentModule,
  IgoPanelModule
} from '@igo2/common';

import { ToolboxComponent } from './toolbox.component';

/**
 * @ignore
 */
@NgModule({
  imports: [
    CommonModule,
    IgoActionModule,
    IgoDynamicComponentModule,
    IgoPanelModule
  ],
  exports: [ToolboxComponent],
  declarations: [ToolboxComponent]
})
export class ToolboxModule {}

import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ToolbarItemComponent } from './toolbar-item/toolbar-item.component';
import { ToolboxComponent } from './toolbox/toolbox.component';

@NgModule({
  imports: [
    SharedModule
  ],
  exports: [
    ToolbarComponent,
    ToolboxComponent
  ],
  declarations: [
    ToolbarComponent,
    ToolbarItemComponent,
    ToolboxComponent
  ]
})
export class ToolModule { }

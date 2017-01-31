import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ToolbarItemComponent } from './toolbar-item/toolbar-item.component';
import { ToolPaneComponent } from './tool-pane/tool-pane.component';

@NgModule({
  imports: [
    SharedModule
  ],
  exports: [
    ToolbarComponent,
    ToolPaneComponent
  ],
  declarations: [
    ToolbarComponent,
    ToolbarItemComponent,
    ToolPaneComponent
  ]
})
export class ToolModule { }

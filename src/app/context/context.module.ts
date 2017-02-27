import { NgModule } from '@angular/core';

import { ContextToolComponent } from './context-tool/context-tool.component';
import { ContextItemComponent } from './context-item/context-item.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    ContextToolComponent,
    ContextItemComponent
  ],
  entryComponents: [ContextToolComponent]
})
export class ContextModule { }

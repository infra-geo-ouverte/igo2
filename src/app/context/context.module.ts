import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { ContextToolComponent } from './context-tool/context-tool.component';
import { ContextItemComponent } from './context-item/context-item.component';
import { ContextService } from './shared/context.service';


@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    ContextToolComponent,
    ContextItemComponent
  ],
  entryComponents: [ContextToolComponent],
  providers: [
    ContextService
  ]
})
export class ContextModule { }

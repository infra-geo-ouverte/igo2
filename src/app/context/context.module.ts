import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { ContextListComponent } from './context-list/context-list.component';
import { ContextListItemComponent } from './context-list-item/context-list-item.component';
import { ContextService } from './shared/context.service';
import { ContextEditorComponent } from './context-editor/context-editor.component';


@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    ContextListComponent,
    ContextListItemComponent,
    ContextEditorComponent
  ],
  entryComponents: [
    ContextEditorComponent,
    ContextListComponent
  ],
  providers: [
    ContextService
  ]
})
export class ContextModule { }

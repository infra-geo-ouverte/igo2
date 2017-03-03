import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { ContextListComponent } from './context-list/context-list.component';
import { ContextListItemComponent } from './context-list-item/context-list-item.component';
import { ContextService } from './shared/context.service';
import { ContextEditorComponent } from './context-editor/context-editor.component';
import { ContextFormComponent } from './context-form/context-form.component';


@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [
    ContextListComponent,
    ContextListItemComponent,
    ContextEditorComponent,
    ContextFormComponent
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

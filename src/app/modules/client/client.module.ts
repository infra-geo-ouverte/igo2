import { NgModule} from '@angular/core';

import { FadqLibClientModule } from 'src/lib/client/client.module';
import { FadqClientToolModule } from './client-tool/client-tool.module';
import { FadqClientSchemaConfirmDialogModule } from './client-schema-confirm-dialog/client-schema-confirm-dialog.module';

@NgModule({
  imports: [
    FadqLibClientModule.forRoot(),
    FadqClientToolModule,
    FadqClientSchemaConfirmDialogModule
  ],
  exports: [
    FadqLibClientModule,
    FadqClientSchemaConfirmDialogModule
  ],
  declarations: []
})
export class FadqClientModule {}

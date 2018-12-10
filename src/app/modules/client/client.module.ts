import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { provideClientService } from './shared/client.providers';

import { FadqClientInfoModule } from './info/client-info.module';
import { FadqClientParcelModule } from './parcel/client-parcel.module';
import { FadqClientSchemaModule } from './schema/client-schema.module';
import { FadqClientSchemaFileModule } from './schema-file/client-schema-file.module';
import { FadqClientSchemaElementModule } from './schema-element/client-schema-element.module';

@NgModule({
  imports: [
    CommonModule,
    FadqClientInfoModule.forRoot(),
    FadqClientParcelModule.forRoot(),
    FadqClientSchemaModule.forRoot(),
    FadqClientSchemaFileModule.forRoot(),
    FadqClientSchemaElementModule.forRoot()
  ],
  exports: [
    FadqClientInfoModule,
    FadqClientParcelModule,
    FadqClientSchemaModule,
    FadqClientSchemaFileModule,
    FadqClientSchemaElementModule
  ],
  declarations: []
})
export class FadqClientModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FadqClientModule,
      providers: [
        provideClientService()
      ]
    };
  }
}

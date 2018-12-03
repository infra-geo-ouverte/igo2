import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { provideClientService } from './shared/client.providers';

import { FadqClientInfoModule } from './info/client-info.module';
import { FadqClientParcelModule } from './parcel/client-parcel.module';
import { FadqClientSchemaModule } from './schema/client-schema.module';

@NgModule({
  imports: [
    CommonModule,
    FadqClientInfoModule.forRoot(),
    FadqClientParcelModule.forRoot(),
    FadqClientSchemaModule.forRoot(),
  ],
  exports: [
    FadqClientInfoModule,
    FadqClientParcelModule,
    FadqClientSchemaModule,
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

import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule} from '@angular/material';

import { IgoLanguageModule } from '@igo2/core';

import { provideMunService } from './shared/mun.providers';
import { FadqMunSelectorModule } from './mun-selector/cadastre-mun-selector.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    IgoLanguageModule
  ],
  declarations: [],
  exports: [FadqMunSelectorModule]
})
export class FadqLibCadastreMunModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FadqLibCadastreMunModule,
      providers: [
        provideMunService()
      ]
    };
  }
}

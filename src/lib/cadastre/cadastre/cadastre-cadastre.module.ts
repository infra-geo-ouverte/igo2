import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule} from '@angular/material';

import { IgoLanguageModule } from '@igo2/core';

import { provideCadastreService } from './shared/cadastre.providers';
import { FadqCadastreSelectorModule } from './cadastre-selector/cadastre-cadastre-selector.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    IgoLanguageModule
  ],
  declarations: [],
  exports: [FadqCadastreSelectorModule]
})
export class FadqLibCadastreCadastreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FadqLibCadastreCadastreModule,
      providers: [
        provideCadastreService()
      ]
    };
  }
}

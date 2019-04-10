import { NgModule } from '@angular/core';

import { FadqLibCadastreModule } from 'src/lib/cadastre/cadastre.module';
import { FadqCadastreSearchToolModule } from './cadastre-search-tool/cadastre-search-tool.module';

@NgModule({
  imports: [
    FadqLibCadastreModule,
    FadqCadastreSearchToolModule
  ],
  exports: [
    FadqCadastreSearchToolModule
  ],
  declarations: [],
})
export class FadqCadastreModule {}

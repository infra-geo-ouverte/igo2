import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FadqLibCadastreCadastreModule } from './cadastre/cadastre-cadastre.module';
import { FadqLibCadastreConcessionModule } from './concession/cadastre-concession.module';
import { FadqLibCadastreLotModule } from './lot/cadastre-lot.module';
import { FadqLibCadastreMunModule } from './mun/cadastre-mun.module';

@NgModule({
  imports: [
    CommonModule,
    FadqLibCadastreCadastreModule.forRoot(),
    FadqLibCadastreConcessionModule.forRoot(),
    FadqLibCadastreLotModule.forRoot(),
    FadqLibCadastreMunModule.forRoot()
  ],
  exports: [
    FadqLibCadastreCadastreModule,
    FadqLibCadastreConcessionModule,
    FadqLibCadastreLotModule,
    FadqLibCadastreMunModule
  ],
  declarations: []
})
export class FadqLibCadastreModule {}

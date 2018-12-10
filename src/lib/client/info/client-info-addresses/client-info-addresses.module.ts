import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IgoLanguageModule } from '@igo2/core';

import { ClientInfoAddressesComponent } from './client-info-addresses.component';

@NgModule({
  imports: [
    CommonModule,
    IgoLanguageModule
  ],
  exports: [
    ClientInfoAddressesComponent
  ],
  declarations: [
    ClientInfoAddressesComponent
  ]
})
export class FadqLibClientInfoAddressesModule {}

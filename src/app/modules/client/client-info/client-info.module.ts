import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IgoLanguageModule } from '@igo2/core';

import { ClientInfoComponent } from './client-info.component';

@NgModule({
  imports: [
    CommonModule,
    IgoLanguageModule
  ],
  exports: [ClientInfoComponent],
  declarations: [ClientInfoComponent]
})
export class FadqClientInfoModule {}

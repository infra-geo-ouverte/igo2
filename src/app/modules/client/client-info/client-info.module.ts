import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatBadgeModule } from '@angular/material';

import { IgoLanguageModule } from '@igo2/core';

import { ClientInfoComponent } from './client-info.component';

@NgModule({
  imports: [
    CommonModule,
    MatBadgeModule,
    IgoLanguageModule
  ],
  exports: [ClientInfoComponent],
  declarations: [ClientInfoComponent]
})
export class FadqClientInfoModule {}

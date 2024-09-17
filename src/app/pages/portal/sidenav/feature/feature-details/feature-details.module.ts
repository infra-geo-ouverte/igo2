import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IgoLanguageModule } from '@igo2/core';
import { IgoKeyValueModule, IgoImageModule } from '@igo2/common';
import { RouterModule } from '@angular/router';

import { FeatureDetailsComponent } from './feature-details.component';

/**
 * @ignore
 */
@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    IgoLanguageModule,
    IgoKeyValueModule,
    RouterModule,
    IgoImageModule,
    MatTooltipModule
  ],
  exports: [
    FeatureDetailsComponent],
  declarations: [
    FeatureDetailsComponent]
})
export class IgoFeatureDetailsModule {}

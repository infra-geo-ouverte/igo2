import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IgoLanguageModule } from '@igo2/core';
import { IgoEntitySelectorModule } from '@igo2/common';

import { ClientParcelYearSelectorComponent } from './client-parcel-year-selector.component';

/**
 * @ignore
 */
@NgModule({
  imports: [
    CommonModule,
    IgoEntitySelectorModule,
    IgoLanguageModule
  ],
  exports: [ClientParcelYearSelectorComponent],
  declarations: [ClientParcelYearSelectorComponent]
})
export class FadqLibClientParcelYearSelectorModule {}

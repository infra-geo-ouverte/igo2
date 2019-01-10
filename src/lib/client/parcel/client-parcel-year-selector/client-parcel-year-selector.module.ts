import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material';

import { IgoLanguageModule } from '@igo2/core';

import { ClientParcelYearSelectorComponent } from './client-parcel-year-selector.component';

/**
 * @ignore
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    IgoLanguageModule
  ],
  exports: [ClientParcelYearSelectorComponent],
  declarations: [ClientParcelYearSelectorComponent]
})
export class FadqLibClientParcelYearSelectorModule {}

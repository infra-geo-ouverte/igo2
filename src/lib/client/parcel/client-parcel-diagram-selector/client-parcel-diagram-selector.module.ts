import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material';

import { IgoLanguageModule } from '@igo2/core';

import { ClientParcelDiagramSelectorComponent } from './client-parcel-diagram-selector.component';

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
  exports: [ClientParcelDiagramSelectorComponent],
  declarations: [ClientParcelDiagramSelectorComponent]
})
export class FadqLibClientParcelDiagramSelectorModule {}

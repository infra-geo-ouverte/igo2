import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IgoLanguageModule } from '@igo2/core';
import { IgoEntitySelectorModule } from '@igo2/common';

import { ClientParcelDiagramSelectorComponent } from './client-parcel-diagram-selector.component';

/**
 * @ignore
 */
@NgModule({
  imports: [
    CommonModule,
    IgoLanguageModule,
    IgoEntitySelectorModule
  ],
  exports: [ClientParcelDiagramSelectorComponent],
  declarations: [ClientParcelDiagramSelectorComponent]
})
export class FadqLibClientParcelDiagramSelectorModule {}

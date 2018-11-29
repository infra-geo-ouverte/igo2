import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material';

import { IgoLanguageModule } from '@igo2/core';

import { ClientDiagramSelectorComponent } from './client-diagram-selector.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    IgoLanguageModule
  ],
  exports: [ClientDiagramSelectorComponent],
  declarations: [ClientDiagramSelectorComponent]
})
export class FadqClientDiagramSelectorModule {}

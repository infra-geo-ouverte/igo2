import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatTooltipModule,
  MatIconModule,
  MatListModule
} from '@angular/material';

import { IgoListModule } from '@igo2/common';

import { CatalogLibaryComponent, } from './catalog-library.component';
import { CatalogLibaryItemComponent } from './catalog-library-item.component';

/**
 * @ignore
 */
@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatListModule,
    MatTooltipModule,
    IgoListModule
  ],
  exports: [
    CatalogLibaryComponent
  ],
  declarations: [
    CatalogLibaryComponent,
    CatalogLibaryItemComponent
  ]
})
export class FadqLibCatalogLibraryModule {}

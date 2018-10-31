import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatTooltipModule,
  MatIconModule,
  MatListModule
} from '@angular/material';

import { IgoListModule } from '@igo2/common';

import { FadqCatalogItemsModule } from '../catalog-items/catalog-items.module';

import { CatalogsComponent, } from './catalogs.component';
import { CatalogComponent } from './catalog.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatListModule,
    MatTooltipModule,
    IgoListModule,
    FadqCatalogItemsModule
  ],
  exports: [
    CatalogsComponent
  ],
  declarations: [
    CatalogsComponent,
    CatalogComponent
  ]
})
export class FadqCatalogsModule {}

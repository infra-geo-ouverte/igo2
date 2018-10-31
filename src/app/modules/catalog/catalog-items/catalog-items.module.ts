import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatTooltipModule,
  MatIconModule,
  MatListModule
} from '@angular/material';

import {
  IgoCollapsibleModule,
  IgoListModule
} from '@igo2/common';

import { CatalogItemsComponent, } from './catalog-items.component';
import { CatalogItemComponent } from './catalog-item.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatListModule,
    MatTooltipModule,
    IgoListModule,
    IgoCollapsibleModule
  ],
  exports: [
    CatalogItemsComponent
  ],
  declarations: [
    CatalogItemsComponent,
    CatalogItemComponent
  ]
})
export class FadqCatalogItemsModule {}

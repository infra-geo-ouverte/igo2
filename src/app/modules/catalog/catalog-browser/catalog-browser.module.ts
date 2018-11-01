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

import { CatalogItemRecordsPipe } from './catalog-item-records.pipe';
import { CatalogBrowserComponent } from './catalog-browser.component';
import { CatalogBrowserItemComponent } from './catalog-browser-item.component';

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
    CatalogBrowserComponent
  ],
  declarations: [
    CatalogItemRecordsPipe,
    CatalogBrowserComponent,
    CatalogBrowserItemComponent
  ]
})
export class FadqCatalogBrowserModule {}

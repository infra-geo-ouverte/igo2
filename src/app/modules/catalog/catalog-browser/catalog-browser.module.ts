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

import { CatalogBrowserComponent } from './catalog-browser.component';
import { CatalogBrowserLayerComponent } from './catalog-browser-layer.component';
import { CatalogBrowserGroupComponent } from './catalog-browser-group.component';

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
    CatalogBrowserComponent,
    CatalogBrowserGroupComponent,
    CatalogBrowserLayerComponent
  ]
})
export class FadqCatalogBrowserModule {}

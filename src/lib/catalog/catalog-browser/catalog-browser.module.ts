import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatTooltipModule,
  MatButtonModule,
  MatIconModule,
  MatListModule
} from '@angular/material';

import { IgoLanguageModule } from '@igo2/core';
import {
  IgoCollapsibleModule,
  IgoListModule
} from '@igo2/common';

import { CatalogBrowserComponent } from './catalog-browser.component';
import { CatalogBrowserLayerComponent } from './catalog-browser-layer.component';
import { CatalogBrowserGroupComponent } from './catalog-browser-group.component';

/**
 * @ignore
 */
@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatTooltipModule,
    IgoLanguageModule,
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
export class FadqLibCatalogBrowserModule {}

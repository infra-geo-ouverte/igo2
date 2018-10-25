import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatTooltipModule,
  MatIconModule,
  MatListModule
} from '@angular/material';

import {
  IgoKeyValueModule,
  IgoCollapsibleModule,
  IgoListModule
} from '@igo2/common';
import { IgoLanguageModule } from '@igo2/core';

import { RecordGroupPipe } from './record-group.pipe';
import { SearchStoreComponent } from './search-store.component';
import { SearchStoreItemComponent } from './search-store-item.component';

@NgModule({
  imports: [
    CommonModule,
    MatTooltipModule,
    MatIconModule,
    MatListModule,
    IgoKeyValueModule,
    IgoCollapsibleModule,
    IgoListModule,
    IgoLanguageModule
  ],
  exports: [
    SearchStoreComponent
  ],
  declarations: [
    RecordGroupPipe,
    SearchStoreComponent,
    SearchStoreItemComponent
  ]
})
export class FadqSearchStoreModule {}

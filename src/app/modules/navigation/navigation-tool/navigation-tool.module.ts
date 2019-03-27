import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDividerModule } from '@angular/material';

import { FadqLibPlaceSelectorModule } from 'src/lib/navigation/place-selector/place-selector.module';
import { FadqLibPoiSelectorModule } from 'src/lib/navigation/poi-selector/poi-selector.module';

import { NavigationToolComponent } from './navigation-tool.component';

/**
 * @ignore
 */
@NgModule({
  imports: [
    CommonModule,
    MatDividerModule,
    FadqLibPlaceSelectorModule,
    FadqLibPoiSelectorModule
  ],
  declarations: [NavigationToolComponent],
  exports: [NavigationToolComponent],
  entryComponents: [NavigationToolComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FadqNavigationToolModule {}

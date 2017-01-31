import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { provideStore } from '@ngrx/store';

import { SharedModule } from '../../shared/shared.module';
import { MapModule } from '../../map/map.module';
import { SearchModule } from '../../search/search.module';
import { ToolModule } from '../../tool/tool.module';

import { selectedTool } from '../../reducers';

import { NavigatorComponent } from './navigator.component';

@NgModule({
  imports: [
    MapModule,
    SearchModule,
    ToolModule,
    SharedModule
  ],
  exports: [
    NavigatorComponent
  ],
  declarations: [
    NavigatorComponent
  ],
  providers: [
    provideStore({ selectedTool })
  ]
})
export class NavigatorModule { }

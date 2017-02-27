import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { MapModule } from '../../map/map.module';
import { ContextModule } from '../../context/context.module';
import { SearchModule } from '../../search/search.module';
import { ToolModule } from '../../tool/tool.module';

import { NavigatorComponent } from './navigator.component';

@NgModule({
  imports: [
    MapModule,
    ContextModule,
    SearchModule,
    ToolModule,
    SharedModule
  ],
  exports: [
    NavigatorComponent
  ],
  declarations: [
    NavigatorComponent
  ]
})
export class NavigatorModule { }

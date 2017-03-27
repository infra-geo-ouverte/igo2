import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { AnalysisModule } from '../../analysis/analysis.module';
import { ContextModule } from '../../context/context.module';
import { MapModule } from '../../map/map.module';
import { SearchModule } from '../../search/search.module';
import { ToolModule } from '../../tool/tool.module';

import { NavigatorComponent } from './navigator.component';

@NgModule({
  imports: [
    AnalysisModule,
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

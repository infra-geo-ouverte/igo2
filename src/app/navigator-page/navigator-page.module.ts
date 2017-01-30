import { NgModule } from '@angular/core';

import { NavigatorPageRoutingModule } from './navigator-page-routing.module';
import { NavigatorPageComponent } from './navigator-page.component';
import { SidenavComponent } from './sidenav/sidenav.component';

import { SharedModule } from '../shared/shared.module';
import { MapModule } from '../map/map.module';
import { SearchModule } from '../search/search.module';
import { PrimaryPaneComponent } from './primary-pane/primary-pane.component';
import { SecondaryPaneComponent } from './secondary-pane/secondary-pane.component';

@NgModule({
  imports: [
    NavigatorPageRoutingModule,
    MapModule,
    SearchModule,

    SharedModule
  ],
  declarations: [
    NavigatorPageComponent,
    SidenavComponent,
    PrimaryPaneComponent,
    SecondaryPaneComponent
  ]
})
export class NavigatorPageModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavigatorPageRoutingModule } from './navigator-page-routing.module';
import { NavigatorPageComponent } from './navigator-page.component';
import { MapModule } from '../map/map.module';

@NgModule({
  imports: [
    CommonModule,
    NavigatorPageRoutingModule,
    MapModule
  ],
  declarations: [NavigatorPageComponent]
})
export class NavigatorPageModule { }

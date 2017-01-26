import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavigatorPageRoutingModule } from './navigator-page-routing.module';
import { NavigatorPageComponent } from './navigator-page.component';

import { SharedModule } from '../shared/shared.module';
import { MapModule } from '../map/map.module';

@NgModule({
  imports: [
    NavigatorPageRoutingModule,
    MapModule,

    SharedModule
  ],
  declarations: [
    NavigatorPageComponent,
  ]
})
export class NavigatorPageModule { }

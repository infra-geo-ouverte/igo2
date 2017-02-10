import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { BackdropComponent } from './backdrop/backdrop.component';
import { FlexComponent } from './flex/flex.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { PanelComponent } from './panel/panel.component';
import { ListComponent } from './list/list.component';
import { ListItemDirective } from './list/list-item.directive';
import { ClickoutDirective } from './directives/clickout.directive';
import { KeyvaluePipe } from './pipes/keyvalue.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  declarations: [
    BackdropComponent,
    FlexComponent,
    SidenavComponent,
    PanelComponent,
    ListComponent,
    ListItemDirective,
    ClickoutDirective,
    KeyvaluePipe
  ],
  exports: [
    CommonModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    BackdropComponent,
    FlexComponent,
    SidenavComponent,
    PanelComponent,
    ListComponent,
    ListItemDirective,
    ClickoutDirective,
    KeyvaluePipe
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }
}

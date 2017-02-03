import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import {TranslateModule} from 'ng2-translate';

import { BackdropComponent } from './backdrop/backdrop.component';
import { FlexComponent } from './flex/flex.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { PanelComponent } from './panel/panel.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    MaterialModule
  ],
  declarations: [
    BackdropComponent,
    FlexComponent,
    SidenavComponent,
    PanelComponent
  ],
  exports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    MaterialModule,
    BackdropComponent,
    FlexComponent,
    SidenavComponent,
    PanelComponent
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

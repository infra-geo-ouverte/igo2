import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { TranslateModule } from 'ng2-translate';

import { BackdropComponent } from './backdrop/backdrop.component';
import { FlexibleComponent } from './flexible/flexible.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { PanelComponent } from './panel/panel.component';
import { CollapsibleComponent } from './collapsible/collapsible.component';
import { ListComponent } from './list/list.component';
import { ListItemDirective } from './list/list-item.directive';
import { ClickoutDirective } from './directives/clickout.directive';
import { KeyvaluePipe } from './pipes/keyvalue.pipe';
import { CollapseDirective } from './directives/collapse.directive';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    MaterialModule
  ],
  declarations: [
    BackdropComponent,
    FlexibleComponent,
    SidenavComponent,
    PanelComponent,
    CollapsibleComponent,
    ListComponent,
    ListItemDirective,
    ClickoutDirective,
    KeyvaluePipe,
    CollapseDirective
  ],
  exports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    BackdropComponent,
    FlexibleComponent,
    SidenavComponent,
    PanelComponent,
    CollapsibleComponent,
    ListComponent,
    ListItemDirective,
    ClickoutDirective,
    KeyvaluePipe,
    CollapseDirective
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

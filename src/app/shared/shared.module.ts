import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { MdIconModule } from '@angular/material/icon';

import { BackdropComponent } from './backdrop/backdrop.component';
import { FlexPaneComponent } from './flex-pane/flex-pane.component';
import { FlexMainDirective } from './flex-pane/flex-main.directive';
import { FlexFillDirective } from './flex-pane/flex-fill.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule.forRoot(),
    MdIconModule.forRoot()
  ],
  declarations: [
    BackdropComponent,
    FlexPaneComponent,
    FlexMainDirective,
    FlexFillDirective
  ],
  exports: [
    CommonModule,
    FormsModule,

    MaterialModule,
    MdIconModule,
    BackdropComponent,
    FlexPaneComponent,
    FlexMainDirective,
    FlexFillDirective
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

import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { MdIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';

import { BackdropComponent } from './backdrop/backdrop.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule.forRoot(),
    MdIconModule.forRoot(),
    FlexLayoutModule.forRoot()
  ],
  declarations: [
    BackdropComponent
  ],
  exports: [
    CommonModule,
    FormsModule,

    MaterialModule,
    MdIconModule,
    FlexLayoutModule,
    BackdropComponent
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

import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [],
  declarations: []
})
export class FadqMapModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FadqMapModule
    };
  }
}

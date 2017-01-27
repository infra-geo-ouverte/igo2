import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { LanguageComponent } from './language.component';

@NgModule({
  imports: [
    SharedModule
  ],
  exports: [LanguageComponent],
  declarations: [LanguageComponent]
})

export class LanguageModule { }

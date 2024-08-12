import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IgoLanguageModule } from '@igo2/core';

import { FooterComponent } from './footer.component';

@NgModule({
  declarations: [FooterComponent],
  imports: [CommonModule, IgoLanguageModule],
  exports: [FooterComponent]
})
export class FooterModule {}

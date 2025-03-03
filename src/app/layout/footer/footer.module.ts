import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IgoLanguageModule } from '@igo2/core';
import { IgoSearchModule } from '@igo2/geo';

import { FooterComponent } from './footer.component';

@NgModule({
  declarations: [FooterComponent],
  imports: [CommonModule, IgoLanguageModule, IgoSearchModule.forRoot()],
  exports: [FooterComponent]
})
export class FooterModule {}

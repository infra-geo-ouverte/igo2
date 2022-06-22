import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { IgoLanguageModule } from '@igo2/core';

@NgModule({
  declarations: [
    FooterComponent
  ],
  imports: [
    CommonModule,
    IgoLanguageModule
  ],
  exports: [
    FooterComponent
  ]
})
export class FooterQccaModule { }

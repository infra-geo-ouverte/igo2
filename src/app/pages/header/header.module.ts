import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { IgoLanguageModule } from '@igo2/core';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    IgoLanguageModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }

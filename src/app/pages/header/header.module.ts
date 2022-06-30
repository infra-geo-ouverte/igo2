import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { IgoLanguageModule } from '@igo2/core';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    IgoLanguageModule,
    MatToolbarModule
    ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }

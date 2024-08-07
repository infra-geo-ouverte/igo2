import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

import { IgoLanguageModule } from '@igo2/core';

import { SearchBarComponent } from '../search-bar/search-bar.component';
import { HeaderComponent } from './header.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    IgoLanguageModule,
    MatToolbarModule,
    SearchBarComponent
  ],
  exports: [HeaderComponent]
})
export class HeaderModule {}

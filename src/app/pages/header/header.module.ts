import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

import { IgoLanguageModule } from '@igo2/core';

import { HeaderComponent } from './header.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, IgoLanguageModule, MatToolbarModule],
  exports: [HeaderComponent]
})
export class HeaderModule {}

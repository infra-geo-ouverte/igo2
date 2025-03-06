import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

import { IgoLanguageModule } from '@igo2/core';

import { FooterComponent } from './footer.component';

@NgModule({
  declarations: [FooterComponent],
  imports: [CommonModule, IgoLanguageModule, MatExpansionModule, MatIconModule],
  exports: [FooterComponent]
})
export class FooterModule {}

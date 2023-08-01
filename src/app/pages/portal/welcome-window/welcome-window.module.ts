import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';

import { WelcomeWindowComponent } from './welcome-window.component';
import { IgoLanguageModule } from '@igo2/core';
import { IgoInteractiveTourModule, IgoCustomHtmlModule } from '@igo2/common';

@NgModule({
  imports: [
    IgoLanguageModule,
    CommonModule,
    FormsModule,
    MatDialogModule,
    IgoInteractiveTourModule,
    IgoCustomHtmlModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatToolbarModule
  ],
  declarations: [WelcomeWindowComponent],
  exports: [WelcomeWindowComponent]
})
export class IgoWelcomeWindowModule {}

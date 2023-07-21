import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';

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

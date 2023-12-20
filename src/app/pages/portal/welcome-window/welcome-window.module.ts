import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { IgoCustomHtmlModule, IgoInteractiveTourModule } from '@igo2/common';
import { IgoLanguageModule } from '@igo2/core';

import { WelcomeWindowComponent } from './welcome-window.component';

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
        MatToolbarModule,
        WelcomeWindowComponent
    ],
    exports: [WelcomeWindowComponent]
})
export class IgoWelcomeWindowModule {}

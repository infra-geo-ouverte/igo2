import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

import { IgoLanguageModule } from '@igo2/core';

import { HeaderComponent } from './header.component';

@NgModule({
    imports: [CommonModule, IgoLanguageModule, MatToolbarModule, HeaderComponent],
    exports: [HeaderComponent]
})
export class HeaderModule {}

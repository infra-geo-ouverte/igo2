import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { GiinDistribuerDialogComponent } from './dialog/giin-distribuer-dialog.component';
import { IgoLanguageModule } from '@igo2/core';
/**
 * @ignore
 */
@NgModule({
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatInputModule ,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    IgoLanguageModule
  ],
  exports: [GiinDistribuerDialogComponent],
  declarations: [
    GiinDistribuerDialogComponent
  ]
})
export class IgoGIINModule {}

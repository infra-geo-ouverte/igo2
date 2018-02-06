import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IgoModule } from '@igo2/igo2';

import { BackdropComponent } from './backdrop';
import { FlexibleComponent } from './flexible';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    IgoModule
  ],
  declarations: [
    BackdropComponent,
    FlexibleComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    IgoModule,

    BackdropComponent,
    FlexibleComponent
  ]
})
export class SharedModule { }

export * from './backdrop';
export * from './flexible';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule, FormBuilder, ReactiveFormsModule }   from '@angular/forms';

import { Logger } from './logger/index';
import { DialogService } from './dialog/index';
import { CanDeactivateGuard } from './guards/index';

@NgModule({
  imports: [CommonModule, HttpModule, JsonpModule, RouterModule, FormsModule, ReactiveFormsModule],
  providers: [FormBuilder, Logger, DialogService, CanDeactivateGuard],
  exports: [CommonModule, HttpModule, JsonpModule, RouterModule, FormsModule, ReactiveFormsModule]
})

export class CoreModule {}

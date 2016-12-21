import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AboutComponent } from './about.component';

import { AuthGuard }             from '../shared';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'about', component: AboutComponent, canActivate: [AuthGuard] }
    ])
  ],
  exports: [RouterModule]
})
export class AboutRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NavigatorComponent } from './navigator.component';

const routes: Routes = [
  { path: '', component: NavigatorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class NavigatorRoutingModule { }

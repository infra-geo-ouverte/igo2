import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavigatorPageComponent } from './navigator-page.component';

const routes: Routes = [
  { path: '', component: NavigatorPageComponent },
  { path: 'nav/:id', component: NavigatorPageComponent/*, canActivate: [AuthGuard]*/ }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class NavigatorPageRoutingModule { }

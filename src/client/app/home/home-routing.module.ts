import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { AuthGuard }             from '../shared';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: HomeComponent },
      { path: 'nav/:id', component: HomeComponent, canActivate: [AuthGuard] }
    ])
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

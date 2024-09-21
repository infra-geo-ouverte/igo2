import { Routes } from '@angular/router';

import { BuildingDetailsComponent } from './pages/building-details/building-details.component';
import { CarteComponent } from './pages/carte/carte.component';
import { ImmeublesComponent } from './pages/immeubles/immeubles.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'carte',
    pathMatch: 'full'
  },
  {
    path: 'carte',
    component: CarteComponent
  },
  {
    path: 'immeubles',
    component: ImmeublesComponent
  },
  {
    path: 'immeubles/:numero_immeuble',
    component: BuildingDetailsComponent
  },
  {
    path: '**',
    redirectTo: 'not-found'
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  }
];

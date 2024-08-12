import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  items = new BehaviorSubject<any>([
    {
      title: 'Accueil',
      link: ''
    },
    {
      title: 'Expertises',
      link: ''
    }
  ]);
  constructor() {}
}

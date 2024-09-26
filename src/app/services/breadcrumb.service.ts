import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  items = new BehaviorSubject<any>([
    {
      title: 'Accueil',
      link: 'https://www.sqi.gouv.qc.ca/'
    },
    {
      title: 'Outil de repérage d\'immeubles',
      link: ''
    }
  ]);
  constructor() {}
}

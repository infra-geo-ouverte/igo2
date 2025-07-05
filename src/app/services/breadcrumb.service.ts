import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private breadcrumbItems = new BehaviorSubject<
    { label: string; url: string }[]
  >([]);

  items = this.breadcrumbItems.asObservable();

  setBreadcrumb(route: string, data?: any): void {
    const breadcrumbs = [
      { label: 'Accueil', url: 'https://www.sqi.gouv.qc.ca/' },
      { label: 'À propos', url: 'https://www.sqi.gouv.qc.ca/a-propos' },
      { label: 'Nous joindre', url: 'https://www.sqi.gouv.qc.ca/a-propos/nous-joindre' },
      { label: "Outil de repérage d'immeubles", url: '/' }
    ];

    switch (route) {
      case '/carte':
        breadcrumbs.push({ label: 'Carte', url: '/carte' });
        break;
      case '/immeubles':
        breadcrumbs.push({ label: 'Immeubles', url: '/immeubles' });
        break;
      case `/immeubles/${data?.numero_immeuble}`:
        breadcrumbs.push({ label: 'Immeubles', url: '/immeubles' });
        // Utilisation de l'adresse courte
        const adresseCourte =
          data?.adresse_immeuble_courte || `Immeuble ${data.numero_immeuble}`;
        breadcrumbs.push({
          label: adresseCourte,
          url: `/immeubles/${data.numero_immeuble}`
        });
        break;
      default:
        break;
    }
    this.breadcrumbItems.next(breadcrumbs);
  }
  constructor() {}
}

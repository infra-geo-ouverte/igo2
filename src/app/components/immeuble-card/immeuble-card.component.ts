import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-immeuble-card',
  templateUrl: './immeuble-card.component.html',
  styleUrls: ['./immeuble-card.component.scss']
})
export class ImmeubleCardComponent {
  @Input() item: any;

  formatTitle(item: any): string {
    if (!item.adresse_immeuble) return '';

    let partis = item.adresse_immeuble.split(',').map((p) => p.trim());

    if (partis.length >= 4) {
      return `${partis[0]}, ${partis[1]}\n${partis[2]} (${partis[3]}) ${partis.slice(4).join(' ')}`;
    }

    return item.adresse_immeuble; // Retourne l'adresse originale si elle ne suit pas le format attendu
  }
}

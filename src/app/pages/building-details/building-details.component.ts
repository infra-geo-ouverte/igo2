import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { first } from 'rxjs';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { ImmeublesService } from 'src/app/services/immeubles.service';

@Component({
  selector: 'app-building-details',
  templateUrl: './building-details.component.html',
  styleUrls: ['./building-details.component.scss']
})
export class BuildingDetailsComponent implements OnInit {
  numero_immeuble: any;
  buildingDetails: any;

  showingMap = false;
  google_embed_url: SafeResourceUrl;
  google_full_map_url: string;

  constructor(
    private readonly route: ActivatedRoute,
    private immeublesService: ImmeublesService,
    private sanitizer: DomSanitizer,
    private breadcrumbService: BreadcrumbService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.numero_immeuble = params['numero_immeuble'];
      if (this.numero_immeuble) {
        this.immeublesService
          .getBuildingDetails(this.numero_immeuble)
          .pipe(first())
          .subscribe((buildingDetails) => {
            this.buildingDetails = buildingDetails;
            // hard coded value
            this.buildingDetails.nom_proprietaire = 'Nom Exemple';

            // Extraction de l'adresse courte (sans code postal)
            const adresseComplete = this.buildingDetails.adresse_immeuble;
            const adresseCourte = this.extraireAdresseCourte(adresseComplete);
            // Mise à jour du fil d'Ariane avec l'adresse courte
            this.breadcrumbService.setBreadcrumb(
              `/immeubles/${this.numero_immeuble}`,
              {
                numero_immeuble: this.numero_immeuble,
                adresse_immeuble_courte: adresseCourte
              }
            );

            // google maps urls
            this.google_embed_url =
              this.sanitizer.bypassSecurityTrustResourceUrl(
                encodeURI(
                  'https://maps.google.com/maps?&q=' +
                    this.buildingDetails.adresse_immeuble +
                    '&output=embed&language=fr'
                )
              );
            this.google_full_map_url = encodeURI(
              'https://maps.google.com/maps?&q=' +
                this.buildingDetails.adresse_immeuble +
                '&language=fr'
            );
            console.log(this.buildingDetails.google_embed_url);
          });
      }
    });
  }

  toggleShowMap() {
    this.showingMap = !this.showingMap;
  }

  private extraireAdresseCourte(adresse: string): string {
    return adresse.replace(/,\s*[A-Z]\d[A-Z] \d[A-Z]\d$/, '').trim(); //chercher un code postal canadien valide en fin de chaîne et le supprimer proprement.
  }
}

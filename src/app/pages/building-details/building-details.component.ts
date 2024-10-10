import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { first } from 'rxjs';
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
    private sanitizer: DomSanitizer
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

            // google maps urls
            this.google_embed_url = this.sanitizer.bypassSecurityTrustResourceUrl(encodeURI(
              'https://maps.google.com/maps?&q=' + this.buildingDetails.adresse_immeuble + '&output=embed&language=fr'));
            this.google_full_map_url = encodeURI(
              'https://maps.google.com/maps?&q=' + this.buildingDetails.adresse_immeuble + '&language=fr');
            console.log(this.buildingDetails.google_embed_url);
          });
      }
    });
  }

  toggleShowMap() {
    this.showingMap = !this.showingMap;
  }
}

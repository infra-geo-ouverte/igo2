import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
  constructor(
    private readonly route: ActivatedRoute,
    private immeublesService: ImmeublesService
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
          });
      }
    });
  }
}

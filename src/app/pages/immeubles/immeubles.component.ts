import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { FilterService } from 'src/app/services/filter.service';
import { ImmeublesService } from 'src/app/services/immeubles.service';

@Component({
  selector: 'app-immeubles',
  templateUrl: './immeubles.component.html',
  styleUrls: ['./immeubles.component.scss']
})
export class ImmeublesComponent implements OnInit {
  immeubles: any;
  columns = '*';
  sortBy = 'adresse_immeuble';
  limit = 10;
  offset = 0;
  total = 0;
  pages = 1;
  valuesMap = new Map<string, string[]>();

  constructor(
    private immeublesService: ImmeublesService,
    private readonly filterService: FilterService,
    private readonly cdr: ChangeDetectorRef,
    private breadcrumbService: BreadcrumbService
  ) {}

  ngOnInit(): void {
    this.getImmeubles();
    this.filterService.filter.subscribe((valuesMap) => {
      this.valuesMap = valuesMap;
      this.getImmeubles();
    });

    this.breadcrumbService.setBreadcrumb('/immeubles'); // pour le fil d'ariane
  }

  onPage(page: number) {
    this.offset = this.limit * page;
    this.getImmeubles();
  }

  onPageSize(pageSize: number) {
    this.limit = pageSize;
    this.getImmeubles();
  }

  onNumberPerPage(value: string) {
    this.limit = parseInt(value);
    this.getImmeubles();
  }

  onSortBy(value: string) {
    this.sortBy = value;
    this.getImmeubles();
  }

  getFilterParam(valuesMap: Map<string, string[]>): string {
    let filterConditions: string[] = [];

    valuesMap.forEach((values, key) => {
      if (values.length > 0) {
        const conditions = values
          .map((value) => `lower(${key}) LIKE '%${value.replace(/'/g, "''")}%'`)
          .join(' OR ');

        filterConditions.push(`(${conditions})`);
      }
    });

    return filterConditions.length > 0 ? filterConditions.join(' AND ') : '';
  }

  getImmeubles() {
    const filterParams = this.getFilterParam(this.valuesMap);
    //console.log('Filtres envoyés dans la requête SQL:', filterParams);

    /*
    if (!filterParams) {
      console.warn(
        "Aucun filtre sélectionné, envoi d'une requête sans filtre."
      );
    }*/

    this.immeublesService
      .getImmeubles(
        filterParams,
        this.columns,
        this.sortBy,
        this.limit,
        this.offset
      )
      .subscribe({
        next: (response: any) => {
          console.log(
            `Params: limit: ${this.limit}, offset: ${this.offset}, response-length: ${response.length}`
          );
          this.total = response.total;
          this.pages = Math.ceil(this.total / this.limit);
          this.immeubles = response.data;
          this.cdr.markForCheck();
        },
        error: (error) => {
          console.error('Erreur lors de la récupération des immeubles:', error);
        }
      });
  }

  showFilters = false; // Masquer les filtres par défaut

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }
}

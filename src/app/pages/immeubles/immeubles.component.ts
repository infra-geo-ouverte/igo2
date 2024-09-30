import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

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
  valuesMap = new Map<string, string>();

  constructor(
    private immeublesService: ImmeublesService,
    private readonly filterService: FilterService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getImmeubles();
    this.filterService.filter.subscribe((valuesMap) => {
      this.valuesMap = valuesMap;
      this.getImmeubles();
    });
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

  getFilterParam(valuesMap: Map<string, string>) {
    let filterString = ' ';
    valuesMap.forEach((value, key) => {
      filterString += `lower(${key}) LIKE '%${value}%'&`;
    });
    return filterString.substring(0, filterString.length - 1);
  }

  getImmeubles() {
    this.immeublesService
      .getImmeubles(
        this.getFilterParam(this.valuesMap),
        this.columns,
        this.sortBy,
        this.limit,
        this.offset
      )
      .subscribe((response: any) => {
        console.log(
          `Params: limit: ${this.limit}, offset: ${this.offset}, response-length: ${response.length}`
        );
        this.total = response.total;
        //this.limit = response.data.length;
        /*  if (response.total < 10 && response.total > 0) {
          this.limit = response.data.length;
        } else {
          this.limit = 10;
        } */
        this.pages = Math.ceil(this.total / this.limit);
        this.immeubles = response.data;
        this.cdr.markForCheck();
        debugger;
      });
  }
}

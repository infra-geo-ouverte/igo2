import { Component, OnInit } from '@angular/core';

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
  sort = '';
  limit = 10;
  offset = 0;
  total = 50;
  filter = '';

  constructor(
    private immeublesService: ImmeublesService,
    private readonly filterService: FilterService
  ) {}

  ngOnInit(): void {
    this.getImmeubles();
    this.filterService.filter.subscribe((filter) => {
      this.filter = filter;
      this.getImmeubles();
    });
  }

  onPaginate(page: number) {
    this.offset = this.limit * page;
    this.getImmeubles();
  }

  getImmeubles() {
    this.immeublesService
      .getImmeubles(
        this.filter,
        this.columns,
        this.sort,
        this.limit,
        this.offset
      )
      .subscribe((response: any) => {
        //this.total = response.length;
        this.immeubles = response;
      });
  }
}

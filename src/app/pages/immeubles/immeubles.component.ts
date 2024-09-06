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
  total = 0;
  pages = 1;
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
        console.log(
          `Params: limit: ${this.limit}, offset: ${this.offset}, response-length: ${response.length}`
        );
        this.total = response.length;
        if (response.length < 10 && response.length > 0) {
          this.limit = response.length;
        } else {
          this.limit = 10;
        }
        this.pages = Math.ceil(this.total / this.limit);
        this.immeubles = response;
      });
  }
}

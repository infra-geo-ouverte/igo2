import { Component, OnInit } from '@angular/core';

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

  constructor(private immeublesService: ImmeublesService) {}

  ngOnInit(): void {
    this.getImmeubles();
  }

  onPaginate(page: number) {
    this.offset = this.limit * page;
    this.getImmeubles();
  }

  getImmeubles() {
    this.immeublesService
      .getImmeubles(this.columns, this.sort, this.limit, this.offset)
      .subscribe((response: any) => {
        //this.total = response.length;
        this.immeubles = response;
      });
  }
}

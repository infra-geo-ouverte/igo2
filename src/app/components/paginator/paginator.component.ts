import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {
  _limit: number = 0;
  _skip: number = 0;
  _total: number = 0;
  _pages = 0;
  pagesArr = new Array(0);
  currentPage = 0;
  pagesFlag = false;
  pagesStart = 0;

  @Input() set limit(value: number) {
    this._limit = value;
  }
  @Input() set skip(value: number) {
    this._skip = value;
  }
  @Input() set total(value: number) {
    this._total = value;
  }
  @Input() set pages(value: number) {
    this._pages = value;
  }

  @Output() page = new EventEmitter<number>();
  @Output() pageSize = new EventEmitter<number>();

  ngOnInit(): void {
    console.log();
  }

  onPage(a: any) {
    this.page.next(a.pageIndex);
    if (a.pageSize !== this._limit) this.pageSize.next(a.pageSize);
  }
}

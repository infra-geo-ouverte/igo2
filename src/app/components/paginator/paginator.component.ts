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

  @Output() paginate = new EventEmitter<number>();

  ngOnInit(): void {
    this.updatePages();
  }

  updatePages() {
    this.pagesFlag = false;
    this.pagesStart = 0;
    if (this._pages > 5) {
      this.pagesArr = new Array(5);
      this.pagesFlag = true;
    } else this.pagesArr = new Array(this._pages);
  }

  onNext() {
    if (this.currentPage + 1 < this._pages) {
      this.currentPage = this.currentPage + 1;
      if (this.currentPage > 1) this.pagesStart++;
      console.log(
        'current page: ',
        this.currentPage,
        ' pageStart: ',
        this.pagesStart
      );
    }
    this.paginate.next(this.currentPage);
  }

  onPrevious() {
    if (this.currentPage - 1 >= 0) {
      this.currentPage = this.currentPage - 1;

      if (this.currentPage < 2) this.pagesStart--;
    }
    this.paginate.next(this.currentPage);
  }

  onPage(i: any) {
    this.currentPage = i;
    console.log(
      'current page: ',
      this.currentPage,
      ' pageStart: ',
      this.pagesStart
    );
    this.paginate.next(this.currentPage);
  }
}

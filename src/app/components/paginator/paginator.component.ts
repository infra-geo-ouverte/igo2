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
  pages = new Array(0);
  currentPage = 1;

  @Input() set limit(value: number) {
    this._limit = value;
  }
  @Input() set skip(value: number) {
    this._skip = value;
  }
  @Input() set total(value: number) {
    this._total = value;
    this.updatePages();
  }

  @Output() paginate = new EventEmitter<number>();

  ngOnInit(): void {
    this.updatePages();
  }

  updatePages() {
    if (this._total > 0 && this._limit > 0) {
      this.pages = new Array(Math.floor(this._total / this._limit));
    }
  }

  onNext() {
    if (this.currentPage + 1 < Math.floor(this._total / this._limit))
      this.currentPage = this.currentPage + 1;
    this.paginate.next(this.currentPage);
  }

  onPrevious() {
    if (this.currentPage - 1 >= 0) this.currentPage = this.currentPage - 1;
    this.paginate.next(this.currentPage);
  }

  onPage(i: any) {
    this.currentPage = i + 1;
    this.paginate.next(this.currentPage);
  }
}

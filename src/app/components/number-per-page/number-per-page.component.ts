import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-number-per-page',
  templateUrl: './number-per-page.component.html',
  styleUrls: ['./number-per-page.component.scss']
})
export class NumberPerPageComponent {
  isSortOpen = false;
  isNumberOpen = false;

  @Output() numberChange = new EventEmitter<number>();
  @Output() sortByChange = new EventEmitter<any>();

  onSelect(value: any) {
    console.log('Selected: ', value);
    this.numberChange.next(value);
  }

  onSelectSortBy(value: any) {
    console.log('Selected: ', value);
    this.sortByChange.next(value);
  }

  toggleSortOpen() {
    this.isSortOpen = !this.isSortOpen;
  }

  toggleNumberOpen() {
    this.isNumberOpen = !this.isNumberOpen;
  }

  closeAll() {
    this.isSortOpen = false;
    this.isNumberOpen = false;
  }
}

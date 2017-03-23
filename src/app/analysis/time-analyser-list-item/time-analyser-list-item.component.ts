import { Component, OnInit, Input } from '@angular/core';

import { FilterableLayer } from '../../map/shared/layers';

@Component({
  selector: 'igo-time-analyser-list-item',
  templateUrl: './time-analyser-list-item.component.html',
  styleUrls: ['./time-analyser-list-item.component.styl']
})
export class TimeAnalyserListItemComponent implements OnInit {

  @Input() layer: FilterableLayer;

  constructor() { }

  ngOnInit() {
  }

  handleDateChange(date: Date | [Date, Date]) {
    this.layer.filterByDate(date);
  }

}

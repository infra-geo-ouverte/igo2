import { Component, OnInit, Input } from '@angular/core';

import { Layer } from '../../map/shared/layers/layer';

@Component({
  selector: 'igo-time-analyser-list-item',
  templateUrl: './time-analyser-list-item.component.html',
  styleUrls: ['./time-analyser-list-item.component.styl']
})
export class TimeAnalyserListItemComponent implements OnInit {

  @Input() layer: Layer;

  constructor() { }

  ngOnInit() {
  }

  handleDateChange(date: Date | [Date, Date]) {
    this.layer.applyDateFilter(date);
  }

}

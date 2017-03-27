import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export interface TimeFilterOptions {
  min: string;
  max: string;
  range?: boolean;
  value?: string;
  values?: [string, string];
}

@Component({
  selector: 'igo-time-analyser-form',
  templateUrl: './time-analyser-form.component.html',
  styleUrls: ['./time-analyser-form.component.styl']
})
export class TimeAnalyserFormComponent implements OnInit {

  @Input() options: TimeFilterOptions;
  @Output() change: EventEmitter<Date | [Date | Date]> = new EventEmitter();

  public type: 'date' | 'time' | 'datetime' = 'datetime';
  public format: string = 'YYYY/MM/DD HH:mm';

  public _date: any;
  public _minDate: any;
  public _maxDate: any;

  get isRange(): boolean {
    return this.options.range === undefined ? false : this.options.range;
  }

  get date(): Date {
    return this._date ? new Date(this._date) : undefined;
  }

  get minDate(): Date {
    return this._minDate ? new Date(this._minDate) : new Date(this.options.min);
  }

  get maxDate(): Date {
    return this._maxDate ? new Date(this._maxDate) : new Date(this.options.max);
  }

  constructor() { }

  ngOnInit() { }

  handleDateChange(event: any) {
    if (this.isRange) {
      this.change.emit([this.minDate, this.maxDate]);
    } else {
      this.change.emit(this.date);
    }
  }
}

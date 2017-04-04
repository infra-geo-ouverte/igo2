import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface TimeFilterOptions {
  min?: string;
  max?: string;
  range?: boolean;
  value?: string;
  values?: [string, string];
  type?: 'date' | 'time' | 'datetime';
  format?: string;
}

@Component({
  selector: 'igo-time-analyser-form',
  templateUrl: './time-analyser-form.component.html',
  styleUrls: ['./time-analyser-form.component.styl']
})
export class TimeAnalyserFormComponent {

  @Input() options: TimeFilterOptions;
  @Output() change: EventEmitter<Date | [Date | Date]> = new EventEmitter();

  public date: Date;
  public startDate: Date;
  public endDate: Date;

  get type(): 'date' | 'time' | 'datetime' {
    return this.options.type === undefined ?
      'date' : this.options.type;
  }

  get format(): string {
    return this.options.format === undefined ?
      'y/MM/dd HH:mm' : this.options.format;
  }

  get isRange(): boolean {
    return this.options.range === undefined ?
      false : this.options.range;
  }

  get min(): Date {
    return this.options.min === undefined ?
      undefined : new Date(this.options.min);
  }

  get max(): Date {
    return this.options.max === undefined ?
      undefined : new Date(this.options.max);
  }

  constructor() { }

  handleDateChange(event: any) {
    if (this.isRange) {
      this.change.emit([this.startDate, this.endDate]);
    } else {
      this.change.emit(this.date);
    }
  }
}

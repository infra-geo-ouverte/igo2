import {
  Component,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'fadq-client-legend-item',
  templateUrl: './client-legend-item.component.html',
  styleUrls: ['./client-legend-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientLegendItemComponent {

  @Input()
  get title(): string {
    return this._title;
  }
  set title(value: string) {
    this._title = value;
  }
  private _title;

  @Input()
  get innerColor(): string {
    return this._innerColor;
  }
  set innerColor(value: string) {
    this._innerColor = value;
  }
  private _innerColor;

  @Input()
  get outerColor(): string {
    return this._outerColor;
  }
  set outerColor(value: string) {
    this._outerColor = value;
  }
  private _outerColor;

  constructor() {}

}

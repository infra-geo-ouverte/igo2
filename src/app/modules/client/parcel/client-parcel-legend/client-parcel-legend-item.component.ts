import {
  Component,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'fadq-client-parcel-legend-item',
  templateUrl: './client-parcel-legend-item.component.html',
  styleUrls: ['./client-parcel-legend-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientParcelLegendItemComponent {

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

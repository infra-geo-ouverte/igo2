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

  @Input() title: string;

  @Input() innerColor: string;

  @Input() outerColor: string;

  constructor() {}

}

import {
  Component,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';

import { Client } from '../../shared/client.interfaces';

@Component({
  selector: 'fadq-client-info-addresses',
  templateUrl: './client-info-addresses.component.html',
  styleUrls: ['./client-info-addresses.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientInfoAddressesComponent {

  @Input() client: Client;

  constructor() {}

}

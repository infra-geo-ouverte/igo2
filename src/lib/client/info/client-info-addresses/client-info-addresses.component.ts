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

  @Input()
  get client(): Client {
    return this._client;
  }
  set client(value: Client) {
    this._client = value;
  }
  private _client;

  constructor() {}

}

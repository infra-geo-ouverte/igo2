import {
  Component,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';

import { Client } from '../shared';

@Component({
  selector: 'fadq-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientInfoComponent {

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

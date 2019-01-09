import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import { Register } from '@igo2/context';
import { ConfigService } from '@igo2/core';

import { substituteProperties } from 'src/lib/utils';
import { EntityStore } from 'src/lib/entity';
import {
  Client,
  ClientParcelDiagram,
  ClientParcelYear,
  ClientSchema,
} from 'src/lib/client';

import { ClientState } from '../client.state';

/**
 * Tool to display a client's info
 */
@Register({
  name: 'client',
  title: 'tools.client',
  icon: 'person'
})
@Component({
  selector: 'fadq-client-tool',
  templateUrl: './client-tool.component.html',
  styleUrls: ['./client-tool.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientToolComponent {

  /**
   * Observable of the active client
   * @ignore
   */
  get client$(): Observable<Client> { return this.clientState.client$; }

  /**
   * Store holding all the avaiables "parcel years"
   * @ignore
   */
  get parcelYearStore(): EntityStore<ClientParcelYear> {
    return this.clientState.parcelYearStore;
  }

  /**
   * Store holding the active client's diagrams
   * @ignore
   */
  get diagramStore(): EntityStore<ClientParcelDiagram> {
    return this.clientState.diagramStore;
  }

  /**
   * Store holding the active client's schemas
   * @ignore
   */
  get schemaStore(): EntityStore<ClientSchema> {
    return this.clientState.schemaStore;
  }

  constructor(
    private clientState: ClientState,
    private configService: ConfigService
  ) {}

  /**
   * Compute the link to the client's info
   * @ignore
   * @param client
   * @returns External link to the client's info
   */
  computeClientInfoLink(client: Client): string {
    const baseUrl = this.configService.getConfig('client.infoLink');
    return  substituteProperties(baseUrl, {
      clientNum: client.info.numero
    });
  }

  /**
   * Open the client's info link into a new window
   * @ignore
   * @param client
   */
  openClientInfoLink(client: Client) {
    window.open(this.computeClientInfoLink(client), 'Client', 'width=800, height=600');
    return false;
  }

}

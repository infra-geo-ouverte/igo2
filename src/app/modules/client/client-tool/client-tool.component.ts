import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import { ToolComponent, EntityStore } from '@igo2/common';
import { ConfigService } from '@igo2/core';

import { substituteProperties } from 'src/lib/utils';
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
@ToolComponent({
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
   * @internal
   */
  get client$(): Observable<Client> { return this.clientState.client$; }

  /**
   * Store holding all the avaiables "parcel years"
   * @internal
   */
  get parcelYearStore(): EntityStore<ClientParcelYear> {
    return this.clientState.parcelYearStore;
  }

  /**
   * Store holding the active client's diagrams
   * @internal
   */
  get diagramStore(): EntityStore<ClientParcelDiagram> {
    return this.clientState.diagramStore;
  }

  /**
   * Store holding the active client's schemas
   * @internal
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
   * @internal
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
   * @internal
   * @param client
   */
  openClientInfoLink(client: Client) {
    window.open(this.computeClientInfoLink(client), 'Client', 'width=800, height=600');
    return false;
  }

}

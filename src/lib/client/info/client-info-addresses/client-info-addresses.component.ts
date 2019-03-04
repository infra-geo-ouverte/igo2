import {
  Component,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';

import {
  Feature,
  IgoMap,
  IChercheSearchSource,
  SearchResult,
  SearchSource,
  SearchSourceService
} from '@igo2/geo';

import { Client } from '../../shared/client.interfaces';

@Component({
  selector: 'fadq-client-info-addresses',
  templateUrl: './client-info-addresses.component.html',
  styleUrls: ['./client-info-addresses.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientInfoAddressesComponent {

  @Input() client: Client;

  @Input() map: IgoMap;

  constructor(private searchSource: SearchSourceService) {}

  searchAddress(address: string) {
    const icherche = this.searchSource
      .getSources()
      .find((source: SearchSource) => {
        return source instanceof IChercheSearchSource;
      }) as IChercheSearchSource;

    icherche.search(address, {
      params: {
        type: 'adresse',
        limit: '1'
      }
    }).subscribe((results: SearchResult<Feature>[]) => this.onSearchAddress(results));
  }

  private onSearchAddress(results: SearchResult<Feature>[]) {
    const feature = results.length === 1 ? results[0].data : undefined;
    if (feature !== undefined) {
      this.map.overlay.setFeatures([feature]);
    } else {
      this.map.overlay.clear();
    }
  }

}

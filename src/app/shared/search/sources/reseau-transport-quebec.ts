import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { uuid, ObjectUtils } from '@igo2/utils';

import {
  Feature,
  FEATURE,
  SearchResult,
  SearchSource,
  SearchSourceOptions,
  ReverseSearch,
  ReverseSearchOptions,
  TextSearch,
  TextSearchOptions
} from '@igo2/geo';

import {
  ReseauTransportQuebecResponse,
  ReseauTransportQuebecData,
  ReseauTransportQuebecPropertiesAlias
} from './reseau-transport-quebec.interface';

@Injectable()
export class ReseauTransportQuebecSearchResultFormatter {
  static propertiesAlias =
    [
      { name: 'title', alias: 'Titre' } as ReseauTransportQuebecPropertiesAlias,
      { name: 'etiquette', alias: 'Informations' } as ReseauTransportQuebecPropertiesAlias,
      { name: 'nommun', alias: 'Municipalité' } as ReseauTransportQuebecPropertiesAlias,
      { name: 'messagpan', alias: 'Message' } as ReseauTransportQuebecPropertiesAlias,
      { name: 'noroute', alias: '# de route' } as ReseauTransportQuebecPropertiesAlias,
      { name: 'nosortie', alias: '# de sortie' } as ReseauTransportQuebecPropertiesAlias,
      { name: 'direction', alias: 'Direction' } as ReseauTransportQuebecPropertiesAlias,
      { name: 'typesort', alias: 'Type de sortie' } as ReseauTransportQuebecPropertiesAlias
    ];

  formatResult(result: SearchResult<Feature>): SearchResult<Feature> {
    const shownProperties = {};
    const propertiesAlias = ReseauTransportQuebecSearchResultFormatter.propertiesAlias;
    for (const key in propertiesAlias) {
      if (propertiesAlias.hasOwnProperty(key)) {
        const aliasProperty = propertiesAlias[key];
        shownProperties[aliasProperty.alias] = result.data.properties[aliasProperty.name];
      }
    }
    result.data.properties = shownProperties;
    return result;
  }
}

export class ReseauTransportQuebec extends SearchSource {
  static propertiesBlacklist: string[] = [
    'id',
    'recherche',
    'type',
    'coord_x',
    'coord_y',
    'cote'
  ];

  constructor(
    @Inject('options') options: SearchSourceOptions,
    @Inject(ReseauTransportQuebecSearchResultFormatter)
    private formatter: ReseauTransportQuebecSearchResultFormatter
  ) {
    super(options);
  }

  protected extractResults(response: ReseauTransportQuebecResponse): SearchResult<Feature>[] {
    return response.features.map((data: ReseauTransportQuebecData) => {
      return this.formatter.formatResult(this.dataToResult(data));
    });
  }

  private dataToResult(data: ReseauTransportQuebecData): SearchResult<Feature> {
    const properties = this.computeProperties(data);

    let icon = 'timeline';
    let title_html: string;

    if (properties.hasOwnProperty('title')) {
      title_html = properties.title;
    }
    if (properties.hasOwnProperty('etiquette')) {
      title_html = properties.etiquette;
    }

    if (properties.hasOwnProperty('norte') && properties.hasOwnProperty('affichkm')) {
      properties.title = '# ' + Number(properties.norte) + '+ ' + properties.affichkm;
      title_html = '# ' + Number(properties.norte) + '+ ' + properties.affichkm;

    }
    if (properties.hasOwnProperty('messagpan') && properties.hasOwnProperty('nosortie')) {
      properties.title = `Sortie #${properties.nosortie}`;
      title_html =
        `Sortie #${properties.nosortie} ${properties.direction}`;
      properties.noroute = Number(properties.noroute);
    }

    if (properties.hasOwnProperty('affichkm')
      || properties.hasOwnProperty('nosortie')
      || properties.hasOwnProperty('chainage')) {
      icon = 'place';
    }
    if (properties.hasOwnProperty('nosortie')) {
      icon = 'reply';
    }

    const id = [this.getId(), properties.type, uuid()].join('.');

    return {
      source: this,
      data: {
        type: FEATURE,
        projection: 'EPSG:4326',
        geometry: data.geometry,
        extent: data.bbox,
        properties,
        meta: {
          id,
          title: properties.title
        }
      },
      meta: {
        dataType: FEATURE,
        id,
        title: properties.title,
        titleHtml: title_html,
        icon: icon
      }
    };
  }

  private computeProperties(data: ReseauTransportQuebecData): { [key: string]: any } {
    const properties = ObjectUtils.removeKeys(
      data.properties,
      ReseauTransportQuebec.propertiesBlacklist
    );
    return Object.assign(properties, { type: data.type });
  }
}

@Injectable()
export class ReseauTransportQuebecSearchSource extends ReseauTransportQuebec implements TextSearch {
  static id = 'reseauTransportQuebec';
  static type = FEATURE;

  constructor(
    private http: HttpClient,
    @Inject('options') options: SearchSourceOptions,
    @Inject(ReseauTransportQuebecSearchResultFormatter)
    formatter: ReseauTransportQuebecSearchResultFormatter
  ) {
    super(options, formatter);
  }

  getId(): string {
    return ReseauTransportQuebecSearchSource.id;
  }

  protected getDefaultOptions(): SearchSourceOptions {
    return {
      title: 'Réseau routier Transports Québec',
      searchUrl: 'https://ws.mapserver.transports.gouv.qc.ca/swtq'
    };
  }

  search(
    term: string,
    options?: TextSearchOptions
  ): Observable<SearchResult<Feature>[]> {
    term = term
      .replace(/sortie|repère|kilométrique|auto|routes|route|km| |high|ways|way|roads|road|#|a-|-/gi, '');
    let chainage = '';
    if (term.length === 0) { return of([]); }
    if (term.search(/\+/gi) !== -1) {
      const split_term = term.split(/\+/gi);
      term = split_term[0];
      chainage = split_term[1];
    }

    let searchTerm: any = term;
    if (!isNaN(Number(term))) {
      searchTerm = parseInt(term, 10);
    }

    let repere_filterParams;
    // tslint:disable-next-line:max-line-length
    const simple_filterParams = `FILTER=${'FILTER=<Filter xmlns="http://www.opengis.net/ogc"><PropertyIsEqualTo matchCase="false"><PropertyName>recherche</PropertyName><Literal>' + searchTerm + '</Literal></PropertyIsEqualTo></Filter>'}`;
    // tslint:disable-next-line:max-line-length
    const rtss_filterParams = `FILTER=${'FILTER=<Filter xmlns="http://www.opengis.net/ogc"><PropertyIsEqualTo matchCase="false"><PropertyName>recherche</PropertyName><Literal>' + this.leftPad0(searchTerm, 14) + '</Literal></PropertyIsEqualTo></Filter>'}`;
    // tslint:disable-next-line:max-line-length
    const chainage_filterParams = `rtss=${this.leftPad0(searchTerm, 14).toUpperCase()}&chainage=${Number(chainage)}`;
    // tslint:disable-next-line:max-line-length
    repere_filterParams = `FILTER=${'<Filter xmlns="http://www.opengis.net/ogc"><And><PropertyIsEqualTo matchCase="false"><PropertyName>norte</PropertyName><Literal>' + this.leftPad0(searchTerm, 5) + '</Literal></PropertyIsEqualTo><PropertyIsLike wildCard="*" singleChar="." escapeChar="!" matchCase="false"><PropertyName>affichkm</PropertyName><Literal>km ' + chainage.replace('.', ',') + '</Literal></PropertyIsLike></And></Filter>'}`;
    // tslint:disable-next-line:max-line-length
    const sorties_filterParams = `FILTER=${'<Filter xmlns="http://www.opengis.net/ogc"><Or><PropertyIsEqualTo matchCase="false"><PropertyName>rtssbret</PropertyName><Literal>' + this.leftPad0(searchTerm, 14).toUpperCase() + '</Literal></PropertyIsEqualTo><PropertyIsEqualTo matchCase="false"><PropertyName>rtssrte</PropertyName><Literal>' + this.leftPad0(searchTerm, 14).toUpperCase() + '</Literal></PropertyIsEqualTo><PropertyIsLike wildCard="*" singleChar="." escapeChar="!" matchCase="false"><PropertyName>nosortie</PropertyName><Literal>' + searchTerm + '</Literal></PropertyIsLike></Or></Filter>'}`;

    const callParams = ['REQUEST=GetFeature',
      'SERVICE=WFS',
      'FORMAT=image/png',
      'SLD_VERSION=1.1.0',
      'VERSION=2.0.0',
      'SRSNAME=EPSG:4326',
      'OUTPUTFORMAT=geojson'].join('&');

    const emptyCall = of({ features: [] });

    let a_num_route_call;
    let b_num_tronc_call;
    let c_num_sectn_call;
    let d_num_rts_call;
    let e_rtss_c_call;
    let repere_km_call;
    let sorties_call;

    const limit: number = options.params ? Number(options.params.limit) : 5;
    if (chainage === '') {
      a_num_route_call = this.http.get(
        `${this.searchUrl}?${callParams}&COUNT=${limit}&TYPENAMES=a_num_route&${simple_filterParams}`);
      b_num_tronc_call = this.http.get(
        `${this.searchUrl}?${callParams}&COUNT=${limit}&TYPENAMES=b_num_tronc&${simple_filterParams}`);
      c_num_sectn_call = this.http.get(
        `${this.searchUrl}?${callParams}&COUNT=${limit}&TYPENAMES=c_num_sectn&${simple_filterParams}`);
      d_num_rts_call = this.http.get(
        `${this.searchUrl}?${callParams}&COUNT=${limit}&TYPENAMES=d_num_rts&${rtss_filterParams}`);
      e_rtss_c_call = emptyCall;
      repere_km_call = emptyCall;
      sorties_call = this.http.get(
        `${this.searchUrl}?${callParams}&COUNT=${limit * 3}&TYPENAMES=sortie_aut&${sorties_filterParams}`);
    } else {
      a_num_route_call = emptyCall;
      b_num_tronc_call = emptyCall;
      c_num_sectn_call = emptyCall;
      d_num_rts_call = emptyCall;
      e_rtss_c_call = this.http.get(
        `${this.searchUrl}?${callParams}&COUNT=${limit}&TYPENAMES=e_rtss_c&${chainage_filterParams}`);
      repere_km_call = this.http.get(
        `${this.searchUrl}?${callParams}&COUNT=${limit * 3}&TYPENAMES=repere_km&${repere_filterParams}`);
      sorties_call = emptyCall;
    }
    let call_array;
    call_array = [
      a_num_route_call, b_num_tronc_call,
      c_num_sectn_call, d_num_rts_call,
      sorties_call, e_rtss_c_call, repere_km_call];

    const source = forkJoin(call_array)
      .pipe(map((responses: ReseauTransportQuebecResponse[]) => {
        return this.extractResults(responses[0])
          .concat(this.extractResults(responses[1]))
          .concat(this.extractResults(responses[2]))
          .concat(this.extractResults(responses[3]))
          .concat(this.extractResults(responses[4]))
          .concat(this.extractResults(responses[5]))
          .concat(this.extractResults(responses[6]));
      }));
    return source;
  }

  private leftPad0(num: string, size: number): string {
    let s = num + '';
    while (s.length < size) {
      s = '0' + s;
    }
    return s;
  }
}

@Injectable()
export class ReseauTransportQuebecReverseSearchSource extends ReseauTransportQuebec implements ReverseSearch {
  static id = 'ReseauTransportQuebecReverse';
  static type = FEATURE;
  static propertiesBlacklist: string[] = [];

  constructor(
    private http: HttpClient,
    @Inject('options') options: SearchSourceOptions,
    @Inject(ReseauTransportQuebecSearchResultFormatter)
    formatter: ReseauTransportQuebecSearchResultFormatter
  ) {
    super(options, formatter);
  }

  getId(): string {
    return ReseauTransportQuebecReverseSearchSource.id;
  }

  protected getDefaultOptions(): SearchSourceOptions {
    return {
      title: 'Réseau routier Transports Québec',
      searchUrl: 'https://ws.mapserver.transports.gouv.qc.ca/swtq'
    };
  }

  /**
   * Search a location by coordinates
   * @param lonLat Location coordinates
   * @param distance Search raidus around lonLat
   * @returns Observable of <SearchResult<Feature>[]
   */
  reverseSearch(
    lonLat: [number, number],
    options?: ReverseSearchOptions
  ): Observable<SearchResult<Feature>[]> {
    const threshold = (1 / (111.320 * Math.cos(lonLat[1]))) * options.distance * -1;
    const lat1 = lonLat[1] - threshold;
    const long1 = lonLat[0] - threshold;
    const lat2 = lonLat[1] + threshold;
    const long2 = lonLat[0] + threshold;

    const limit: number = options.params ? Number(options.params.limit) : 5;
    const callParams = ['REQUEST=GetFeature',
      'SERVICE=WFS',
      'FORMAT=image/png',
      'SLD_VERSION=1.1.0',
      'VERSION=2.0.0',
      'SRSNAME=EPSG:4326',
      'OUTPUTFORMAT=geojson',
      `COUNT=${limit}`,
      'bbox=' + lat1 + ',' + long1 + ',' + lat2 + ',' + long2 + ',EPSG:4326',
      `TYPENAMES=`].join('&');

    const a_num_route_call = this.http.get(
      `${this.searchUrl}?${callParams}a_num_route`);
    const repere_km_call = this.http.get(
      `${this.searchUrl}?${callParams}repere_km`);
    const sorties_call = this.http.get(
      `${this.searchUrl}?${callParams}sortie_aut`);


    const call_array = [a_num_route_call, sorties_call, repere_km_call];
    const locateSource = forkJoin(call_array)
      .pipe(map((responses: ReseauTransportQuebecResponse[]) => {
        return this.extractResults(responses[0])
          .concat(this.extractResults(responses[1]))
          .concat(this.extractResults(responses[2]));
      }));

    return locateSource;
  }
}

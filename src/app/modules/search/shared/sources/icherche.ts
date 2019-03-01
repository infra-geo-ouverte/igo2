import { Injector, Injectable, } from '@angular/core';

import { LanguageService } from '@igo2/core';

import { Feature, SearchResult, IChercheSearchResultFormatter } from '@igo2/geo';

@Injectable()
export class FadqIChercheSearchResultFormatter {

  constructor(private languageService: LanguageService) {}

  formatResult(result: SearchResult<Feature>): SearchResult<Feature> {
    const properties = Object.entries(result.data.properties)
      .reduce((out: {[key: string]: any}, entries: [string, any]) => {
        const [key, value] = entries;
        let newKey;
        try {
          newKey = this.languageService.translate.instant(`icherche.${key}`);
        } catch (e) {
          newKey = key;
        }
        out[newKey] = value ? value : '';
        return out;
      }, {});

    result.data.properties = properties;

    return result;
  }
}

/**
 * ICherche search source factory
 * @ignore
 */
export function fadqIChercheSearchResultFormatterFactory(
  languageService: LanguageService
) {
  return new FadqIChercheSearchResultFormatter(languageService);
}

/**
 * Function that returns a provider for the ICherche search source
 */
export function provideFadqIChercheSearchResultFormatter() {
  return {
    provide: IChercheSearchResultFormatter,
    useFactory: fadqIChercheSearchResultFormatterFactory,
    deps: [LanguageService]
  };
}

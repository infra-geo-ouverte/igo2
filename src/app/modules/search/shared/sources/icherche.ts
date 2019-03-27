import { Injectable, } from '@angular/core';

import { LanguageService } from '@igo2/core';
import { Feature, SearchResult } from '@igo2/geo';

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

import { TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID } from '@angular/core';
import {Config} from './config';

export function getTranslationProviders(): Promise<Object[]> {
  // Get the locale id from the global
  // const locale = document['locale'] as string;
  // return no providers if fail to get translation file for locale
  const noProviders: Object[] = [];

  // Define a way to retrieve the local information
  const locale = Config.locale;

  // No locale or U.S. English: no translation providers
  if (!locale || locale === 'en-US') {
    return Promise.resolve(noProviders);
  }

  // Ex: 'locale/messages.es.xlf`
  const translationFile = `./locale/messages.${locale}.xlf`;
  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest;
    xhr.open('GET', translationFile);
    xhr.onload = (data: any) => resolve(
      [
        { provide: TRANSLATIONS, useValue: data.target.response },
        { provide: TRANSLATIONS_FORMAT, useValue: 'xlf' },
        { provide: LOCALE_ID, useValue: locale }
      ]
    );
    xhr.onerror = () => reject(noProviders);
    xhr.send();
  });
}

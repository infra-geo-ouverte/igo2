import { Injectable } from '@angular/core';

import { ConfigService } from '@igo2/core';

import { substituteProperties } from '../../utils/str';
import { ApiConfig } from './api.interfaces';

const API_CONFIG_KEY = 'api';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  /**
   * API config
   */
  private config: ApiConfig = {
    url: ''
  };

  constructor(private configService: ConfigService) {}

  /**
   * Return the API config
   * @returns API config
   */
  getConfig(): ApiConfig {
    return this.configService.getConfig(API_CONFIG_KEY) || this.config;
  }

  /**
   * Return the API base url
   * @returns API base url
   */
  getBaseUrl(): string {
    return this.getConfig().url;
  }

  /**
   * Build a fully qualified URL from a URI.
   * The URI may contain query param placeholders such as ${foo}. They
   * will be replaced if provided in the params argument. If they're
   * not provided, they are not removed.
   * TODO: remove unprovided params)
   * @param uri Base uri without the API base url
   * @param params Optional query params
   * @returns Fully qualified URL with query params
   */
  buildUrl(uri: string, params?: {[key: string]: string | number}): string {
    let url = uri;
    if (!uri.startsWith('http')) {
      url = `${this.getBaseUrl()}${uri}`;
    }
    return this.setUrlParams(url, params || {});
  }

  /**
   * Inject params in the url placeholders
   * @param url Base url
   * @param params Query params
   * @returns URL with query params substitued into it.
   */
  private setUrlParams(url: string, params: {[key: string]: string | number}) {
    return substituteProperties(url, params);
  }

}

import { Injectable } from '@angular/core';

import { ConfigService } from '@igo2/core';
import { ApiConfig } from './api.interfaces';
import { substituteProperties } from '../../utils/str';

const API_CONFIG_KEY = 'api';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private config: ApiConfig = {
    url: ''
  };

  constructor(private configService: ConfigService) {}

   /**
   * Return the API config
   */
  public getConfig(): ApiConfig {
    return this.configService.getConfig(API_CONFIG_KEY) || this.config;
  }

  /**
   * Return the API base url
   */
  public getBaseUrl(): string {
    return this.getConfig().url;
  }

  /**
   * Build a fully qualified URL from a URI
   */
  public buildUrl(uri: string, params?: Object): string {
    let url = uri;
    if (!uri.startsWith('http')) {
      url = `${this.getBaseUrl()}${uri}`;
    }

    url = this.setUrlParams(url, params || {});

    return url;
  }

  /**
   * Inject params in the url placeholders
   */
  private setUrlParams(url: string, params: Object) {
    return substituteProperties(url, params);
  }

}

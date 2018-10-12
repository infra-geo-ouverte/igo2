import { Injectable } from '@angular/core';

import { ConfigService } from '@igo2/core';
import { ApiConfig } from './api.interface';

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
  public buildUrl(uri: string, params: Object = {}): string {
    let url = uri;
    if (!uri.startsWith('http')) {
      url = `${this.getBaseUrl()}${uri}`
    }

    url = this.setUrlParams(url, params);

    return url;
  }

  /**
   * Replace all occurence of ${param} with the corresponding value as defined
   * in the params Object.
   */
  private setUrlParams(url: string, params: Object) {
    Object.entries(params).forEach(entry => {
      url = url.replace(`\$\{${entry[0]}\}`, entry[1]);
    })

    return url;
  }

}

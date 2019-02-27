import { LanguageOptions } from "@igo2/core";
import { SearchSourceOptions } from "@igo2/geo";

interface Environment {
  production: boolean;
  igo: {
    searchSources?: { [key: string]: SearchSourceOptions };
    language?: LanguageOptions;
  };
}

export const environment: Environment = {
  production: true,
  igo: {
    searchSources: {
      nominatim: {
        enabled: false
      },
      icherche: {
        searchUrl: "/icherche/geocode"
      },
      datasource: {
        searchUrl: "/apis/layers/search"
      }
    },
    language: {
      prefix: "./locale/"
    }
  }
};

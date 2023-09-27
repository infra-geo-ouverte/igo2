export interface AppOptions {
  forceCoordsNA: boolean;
  install: {
    enabled?: boolean;
    promote?: boolean;
    manifestPath?: string;
  };
  pwa?: {
    enabled?: boolean;
    path?: string;
  };
}

export interface InteractiveTourConfigOptions {
  tourInMobile: boolean;
  pathToConfigFile: string;
}

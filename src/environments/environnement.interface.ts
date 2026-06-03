import { AllEnvironmentOptions } from '@igo2/integration';
import { EnvironmentOptions as IntegrationEnvironmentOptions } from '@igo2/integration';
import { IHeaderConfig } from '@igo2/sdg-common';

import { MapOverlay } from '../app/pages/portal/map-overlay';

export interface AppEnvironmentOptions extends IntegrationEnvironmentOptions {
  igo: EnvironmentOptions;
}

export interface EnvironmentOptions extends AllEnvironmentOptions {
  /** An header define on a empty object will display the default SDG header with the logo of Quebec Gouv and the title of the app */
  header?: IHeaderConfig;
  hasFooter?: boolean;
  title?: string;
  theme?: string; // enum?
  sidenavTitle?: string;
  sidenav?: {
    languageToggleButton: boolean;
  };
  description?: string;
  favoriteContext4NonAuthenticated?: boolean;
  mapOverlay?: MapOverlay[];
  queryTabs?: boolean;
  welcomeWindow?: {
    discoverTitleInLocale?: string;
    nbVisitToShow?: number;
    nbVisitToShowAgain?: number;
    showAgainOnNewIGOVersion?: boolean;
  };
  hasExpansionPanel?: boolean;
  showRotationButtonIfNoRotation?: boolean;
  offlineButton?: boolean;
  wakeLockApiButton?: boolean;
  hasSearchPointerSummary?: boolean;
  allowResetSearchSourcesOptions?: boolean;
}

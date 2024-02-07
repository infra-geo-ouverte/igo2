import { AllEnvironmentOptions } from '@igo2/integration';
import { EnvironmentOptions as IntegrationEnvironmentOptions } from '@igo2/integration';
import { MapOverlay } from 'src/app/pages/portal/map-overlay/map-overlay.interface';

export interface AppEnvironmentOptions extends IntegrationEnvironmentOptions {
  igo: EnvironmentOptions;
}

export interface EnvironmentOptions extends AllEnvironmentOptions {
  header?: {
    hasHeader?: boolean;
    logo?: string;
    logoPrint?: string;
  };
  hasFooter?: boolean;
  title?: string;
  theme?: string; // enum?
  sidenavTitle?: string;
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
  hasFeatureEmphasisOnSelection?: boolean;
  hasSearchPointerSummary?: boolean;
}

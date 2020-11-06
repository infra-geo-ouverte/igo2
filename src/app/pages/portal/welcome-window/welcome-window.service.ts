import { Injectable } from '@angular/core';

import { ConfigService, StorageService } from '@igo2/core';
import { MatDialogConfig } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class WelcomeWindowService {
  nbVisit: number;
  showAgain: boolean;
  igoVersionDifferentFromStorage = false;

  constructor(
    private configService: ConfigService,
    private storageService: StorageService
  ) {
    this.igoVersionDifferentFromStorage = this.isVersionDifferentFromStorage();
    this.setStorageConfig();
  }

  setStorageConfig() {
    this.nbVisit = Number(this.storageService.get('welcomeWindow_nbVisit'));
    if (!this.nbVisit) {
      this.nbVisit = 0;
    }

    this.storageService.set('welcomeWindow_nbVisit', (this.nbVisit += 1));
    this.storageService.set(
      'version',
      this.configService.getConfig('version.lib')
    );
  }

  isVersionDifferentFromStorage(): boolean {
    if (
      this.storageService.get('version') &&
      this.storageService.get('version') !==
        this.configService.getConfig('version.lib')
    ) {
      return true;
    } else {
      return false;
    }
  }

  hasWelcomeWindow(): boolean {
    if (
      this.storageService.get('welcomeWindow_showAgain') === false ||
      this.storageService.get('welcomeWindow_showAgain') === 'false'
    ) {
      if (
        this.nbVisit >=
        this.configService.getConfig('welcomeWindow.nbVisitToShowAgain')
      ) {
        this.storageService.set('welcomeWindow_nbVisit', 0);
        this.storageService.remove('welcomeWindow_showAgain');
        return true;
      } else if (
        this.configService.getConfig('welcomeWindow.showAgainOnNewIGOVersion')
      ) {
        if (this.igoVersionDifferentFromStorage) {
          this.storageService.set('welcomeWindow_nbVisit', 0);
          this.storageService.remove('welcomeWindow_showAgain');
          return true;
        }
      }
      return false;
    }

    if (typeof this.configService.getConfig('welcomeWindow.nbVisitToShow') !== 'undefined' ) {
      if (this.nbVisit > this.configService.getConfig('welcomeWindow.nbVisitToShow') ) {
        this.storageService.set('welcomeWindow_showAgain', false);
        return false;
      }
    }

    return this.configService.getConfig('welcomeWindow');
  }

  getConfig(): MatDialogConfig {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.maxWidth = '500px';
    dialogConfig.position = { top: '150px' };

    return dialogConfig;
  }

  afterClosedWelcomeWindow() {
    this.storageService.set('welcomeWindow_showAgain', this.showAgain);
  }
}

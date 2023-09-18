import { Injectable } from '@angular/core';
import { LanguageService } from '@igo2/core';
import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';
import { ConfirmDialogService } from '@igo2/common';
import { skip, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PwaService {
  private confirmOpened: boolean = false;
  constructor(
    private updates: SwUpdate,
    private languageService: LanguageService,
    private confirmDialogService: ConfirmDialogService
  ) {
    if (updates.isEnabled) {
      this.handleVersionUpdates();
    }
  }

  checkForUpdates() {
    if (this.updates.isEnabled) {
      interval(60 * 1000 * 2)
        .pipe(skip(1))
        .subscribe(async () => {
          try {
            const updateFound = await this.updates.checkForUpdate();
            console.log(
              updateFound
                ? 'A new version is available.'
                : 'Already on the latest version.'
            );
          } catch (err) {
            console.error('Failed to check for updates:', err);
          }
        });
    }
  }

  private modalUpdatePWA() {
    if (this.confirmOpened) {
      return;
    }
    const title = this.languageService.translate.instant(
      'pwa.new-version-title'
    );
    const body = this.languageService.translate.instant('pwa.new-version');
    const message = `${title} ${body}`;
    this.confirmDialogService
      .open(message)
      .pipe(tap(() => (this.confirmOpened = true)))
      .subscribe((confirm) => {
        if (confirm) {
          this.confirmOpened = false;
          if (window.navigator.onLine) {
            document.location.reload();
          } else {
            alert(
              `Hors-ligne / Offline. Vous devez être en ligne pour mettre à jour l\'application. You must be online to update the application.`
            );
            setTimeout(() => {
              this.modalUpdatePWA();
            }, 900000);
          }
        }
      });
  }

  private handleVersionUpdates(): void {
    this.updates.versionUpdates.subscribe((evt) => {
      switch (evt.type) {
        case 'VERSION_DETECTED':
          console.log(`Downloading new app version: ${evt.version.hash}`);
          break;
        case 'VERSION_READY':
          console.log(`Current app version: ${evt.currentVersion.hash}`);
          console.log(
            `New app version ready for use: ${evt.latestVersion.hash}`
          );
          this.modalUpdatePWA();
          break;
        case 'VERSION_INSTALLATION_FAILED':
          console.error(
            `Failed to install app version '${evt.version.hash}': ${evt.error}`
          );
          break;
      }
    });
  }
}

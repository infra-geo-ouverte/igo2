import { ApplicationRef, Injectable } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { ConfigService, LanguageService } from '@igo2/core';
import { SwUpdate, VersionDetectedEvent } from '@angular/service-worker';
import { concat, interval } from 'rxjs';
import { ConfirmDialogService } from '@igo2/common';
import { filter, first, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PwaService {
  promptEvent: any;
  constructor(
    private platform: Platform,
    public updates: SwUpdate,
    public languageService: LanguageService,
    private configService: ConfigService,
    private confirmDialogService: ConfirmDialogService,
    private appRef: ApplicationRef,
  ) {
    const everyTwoMinutesOnceAppIsStable$ = concat(
      this.appRef.isStable.pipe(
        first(isStable => isStable === true),
        tap(() => {
          this.checkForUpdates();
          this.initPwaPrompt();
        })
        ),
      interval(60 * 1000 * 2)
    );
    everyTwoMinutesOnceAppIsStable$.subscribe(async () => {
      if (updates.isEnabled) {
        try {
          const updateFound = await updates.checkForUpdate();
          console.log(updateFound ? 'A new version is available.' : 'Already on the latest version.');
        } catch (err) {
          console.error('Failed to check for updates:', err);
        }
      }
    });

  }

  private modalUpdatePWA() {
    const title = this.languageService.translate.instant('pwa.new-version-title');
    const body = this.languageService.translate.instant('pwa.new-version');
    const message = `${title} ${body}`;
    this.confirmDialogService.open(message).subscribe((confirm) => {
      if (confirm) {
        this.updates.activateUpdate().then(() => {
          if (window.navigator.onLine) {
            document.location.reload();
          } else {
            alert(`Hors-ligne / Offline. Vous devez être en ligne pour mettre à jour l\'application. You must be online to update the application.`);
            setTimeout(() => {
              this.modalUpdatePWA();
            }, 900000);
          }
        });
      }
    });
  }

  private checkForUpdates(): void {
    if (this.updates.isEnabled) {
      this.updates.versionUpdates.pipe(
        filter((evt): evt is VersionDetectedEvent => evt.type === 'VERSION_DETECTED'))
      .subscribe(() => {
        this.modalUpdatePWA();
      });
  }
  }

  private async initPwaPrompt() {
    if (
      this.configService.getConfig('app') &&
      this.configService.getConfig('app.pwa') &&
      this.configService.getConfig('app.pwa.enabled') &&
      this.configService.getConfig('app.pwa.promote')) {
      if (!this.platform.IOS) {
        window.addEventListener('beforeinstallprompt', (event: any) => {
          event.preventDefault();
          this.promptEvent = event;
          this.listenToUserAction();
        }, { once: true });
      }
    }
  }

  private listenToUserAction() {
    window.addEventListener('click', () => { this.showPrompt(); }, { once: true });
  }

  private async showPrompt() {
    this.promptEvent.prompt();
    const outcome = await this.promptEvent.userChoice;
    this.promptEvent = undefined;
  }
}

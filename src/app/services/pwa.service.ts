import { Injectable } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { ConfigService, LanguageService } from '@igo2/core';
import { SwUpdate, VersionDetectedEvent } from '@angular/service-worker';
import { interval } from 'rxjs';
import { ConfirmDialogService } from '@igo2/common';
import { filter, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PwaService {
  promptEvent: any;
  private confirmOpened: boolean = false;
  constructor(
    private platform: Platform,
    public updates: SwUpdate,
    public languageService: LanguageService,
    private configService: ConfigService,
    private confirmDialogService: ConfirmDialogService
  ) {
    if (updates.isEnabled) {
      interval(60 * 1000 * 2).subscribe(() => updates.checkForUpdate());
    }
  }

  private modalUpdatePWA() {
    if (this.confirmOpened) {
      return;
    }
    const title = this.languageService.translate.instant('pwa.new-version-title');
    const body = this.languageService.translate.instant('pwa.new-version');
    const message = `${title} ${body}`;
    this.confirmDialogService.open(message).pipe(tap(() => this.confirmOpened = true)).subscribe((confirm) => {
      if (confirm) {
        this.confirmOpened = false;
        if (window.navigator.onLine) {
          document.location.reload();
        } else {
          alert(`Hors-ligne / Offline. Vous devez être en ligne pour mettre à jour l\'application. You must be online to update the application.`);
          setTimeout(() => {
            this.modalUpdatePWA();
          }, 900000);
        }
      }
    });
  }

  public checkForUpdates(): void {
    if (this.updates.isEnabled) {
      this.updates.versionUpdates.pipe(
        filter((evt): evt is VersionDetectedEvent => evt.type === 'VERSION_DETECTED'))
      .subscribe(() => {
        this.modalUpdatePWA();
      });
  }
  }

  public async initPwaPrompt(): Promise<any> {
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

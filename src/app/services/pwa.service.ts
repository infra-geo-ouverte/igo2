import { Injectable } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { ConfigService, LanguageService, NetworkService, StorageService } from '@igo2/core';
import { SwUpdate, VersionDetectedEvent } from '@angular/service-worker';
import { interval, timer } from 'rxjs';
import { ConfirmDialogService } from '@igo2/common';
import { filter, skip } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PwaService {
  promptEvent: any;
  private userDismissInThisSession: boolean = false;
  private confimInProgress: boolean = false;
  constructor(
    private platform: Platform,
    public updates: SwUpdate,
    public languageService: LanguageService,
    private configService: ConfigService,
    private confirmDialogService: ConfirmDialogService,
    private storageService: StorageService,
    private networkService: NetworkService
  ) {
    if (updates.isEnabled) {
      interval(60 * 1000 * 2).subscribe(() => updates.checkForUpdate());

      timer(20000).subscribe(() => {
        const pwaUpdate = this.storageService.get('pwaUpdate');
        if (
          window.navigator.onLine &&
          (pwaUpdate === 'dismiss' || pwaUpdate === 'failed') &&
          !this.userDismissInThisSession &&
          !this.confimInProgress) {
          this.modalUpdatePWA();
        }
      });
      this.networkService.currentState().pipe(skip(1)).subscribe((r) => {
        const pwaUpdate = this.storageService.get('pwaUpdate');
        if (
          r.connection &&
          (pwaUpdate === 'dismiss' || pwaUpdate === 'failed') &&
          !this.userDismissInThisSession &&
          !this.confimInProgress) {
          this.modalUpdatePWA();
        }
      });
    }
  }

  private modalUpdatePWA(){
    this.confimInProgress = true;
    const title = this.languageService.translate.instant('pwa.new-version-title');
    const body = this.languageService.translate.instant('pwa.new-version');
    const message = `${title} ${body}`;
    this.confirmDialogService.open(message).subscribe((confirm) => {
      if (confirm) {
        this.updates.activateUpdate().then(() => {
          if (window.navigator.onLine) {
            this.storageService.set('dataLoadSource', 'newVersion');
            this.storageService.set('pwaUpdate', undefined);
            document.location.reload();
          } else {
            alert(`Hors-ligne / Offline. Vous devez être en ligne pour mettre à jour l\'application. You must be online to update the application.`);
            this.storageService.set('pwaUpdate', 'failed');
            this.userDismissInThisSession = false;
          }
        });
      } else {
        this.storageService.set('pwaUpdate', 'dismiss');
        this.userDismissInThisSession = true;
      }
    this.confimInProgress = false;
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
    const promotePWA = this.configService.getConfig('pwa.promote');
    if (promotePWA) {
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

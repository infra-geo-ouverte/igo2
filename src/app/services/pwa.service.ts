import { Injectable } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { AnalyticsService, StorageScope, StorageService } from '@igo2/core';

@Injectable({
  providedIn: 'root'
})
export class PwaService {
  promptEvent: any;
  constructor(
    private platform: Platform,
    private analyticsService: AnalyticsService,
    private storageService: StorageService
  ) { }


  public async initPwaPrompt() {
    if (!this.platform.IOS) {
      window.addEventListener('beforeinstallprompt', (event: any) => {
        event.preventDefault();
        this.promptEvent = event;
        this.listenToUserAction();
      }, { once: true });
    }
  }

  private listenToUserAction() {
    window.addEventListener('click', () => { this.showPrompt(); }, { once: true });
  }

  private async showPrompt() {
    this.promptEvent.prompt();
    const outcome = await this.promptEvent.userChoice;
    this.analyticsService.trackEvent('app', 'installPwa', outcome.outcome);
    this.storageService.set('pwaInstalled', outcome.outcome, StorageScope.LOCAL);
    this.promptEvent = undefined;
  }
}

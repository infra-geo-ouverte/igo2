import { Injectable } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { AnalyticsService, StorageScope, StorageService } from '@igo2/core';
import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PwaService {
  promptEvent: any;
  constructor(
    private platform: Platform,
    private analyticsService: AnalyticsService,
    private storageService: StorageService,
    public updates: SwUpdate
  ) {

    updates.available.subscribe(event => {
      console.log('current version is', event.current);
      console.log('available version is', event.available);
      if (confirm('A new version is avalilable. Do you want to reload the app?')) {
        updates.activateUpdate().then(() => document.location.reload());
      }
    });
  }


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

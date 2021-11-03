import { Injectable } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { AnalyticsService, LanguageService } from '@igo2/core';
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
    public updates: SwUpdate,
    public languageService: LanguageService
  ) {
    if (updates.isEnabled) {
      interval(6 * 60 * 60).subscribe(() => updates.checkForUpdate());
    }
  }

  public checkForUpdates(): void {
    this.updates.available.subscribe(event => this.promptUser(event));
  }

  private promptUser(event): void {
    console.log('current version is', event.current);
    console.log('available version is', event.available);
    console.log(this.languageService.translate.instant('igo.auth.accessAnonymous'));
    const title = this.languageService.translate.instant('pwa.new-version-title');
    const body = this.languageService.translate.instant('pwa.new-version');
    const message = `${title} ${body}`;
    if (confirm(message)) {
      this.updates.activateUpdate().then(() => document.location.reload());
    }
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
    this.promptEvent = undefined;
  }
}

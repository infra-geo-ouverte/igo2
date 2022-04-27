import { Injectable } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { AnalyticsService, ConfigService, LanguageService } from '@igo2/core';
import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PwaService {
  promptEvent: any;
  constructor(
    private platform: Platform,
    private analyticsService: AnalyticsService,
    public updates: SwUpdate,
    public languageService: LanguageService,
    private configService: ConfigService
  ) {
    if (updates.isEnabled) {
      interval(60 * 1000 * 2).subscribe(() => updates.checkForUpdate());
    }
  }

  public checkForUpdates(): void {

    if (this.updates.isEnabled) {
      this.updates.available
      .pipe(debounceTime(25000))
      .subscribe(() => {
        const title = this.languageService.translate.instant('pwa.new-version-title');
        const body = this.languageService.translate.instant('pwa.new-version');
        const message = `${title} ${body}`;
          if(confirm(message)) {
              window.location.reload();
          }
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
    this.analyticsService.trackEvent('app', 'installPwa', outcome.outcome);
    this.promptEvent = undefined;
  }
}

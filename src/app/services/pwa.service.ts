import { Injectable } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { once } from 'process';

@Injectable({
  providedIn: 'root'
})
export class PwaService {
  promptEvent: any;
  constructor(
    private platform: Platform
  ) { }

  public initPwaPrompt() {
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

  private showPrompt() {
    this.promptEvent.prompt();
  }
}

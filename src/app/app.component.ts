import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';

import { AuthOptions } from '@igo2/auth';
import { ConfigService, LanguageService, MessageService } from '@igo2/core';
import { AnalyticsListenerService, AppOptions } from '@igo2/integration';
import { DomUtils, userAgent } from '@igo2/utils';

import { delay, first } from 'rxjs';

import { PwaService } from './services/pwa.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public authConfig: AuthOptions;
  public hasHeader = true;
  public hasFooter = true;
  private promptEvent: any;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    protected languageService: LanguageService,
    private configService: ConfigService,
    private analyticsListenerService: AnalyticsListenerService,
    private titleService: Title,
    private metaService: Meta,
    private messageService: MessageService,
    private pwaService: PwaService,
    private router: Router
  ) {
    this.authConfig = this.configService.getConfig('auth', {});

    this.readTitleConfig();
    this.readDescriptionConfig();

    this.analyticsListenerService.listen();

    this.detectOldBrowser();

    this.hasHeader = this.configService.getConfig('header.hasHeader', false);
    this.hasFooter = this.configService.getConfig('hasFooter', false);

    this.setManifest();
    this.installPrompt();
    this.pwaService.checkForUpdates();
  }

  ngOnInit(): void {
    this.handleSplashScreen();
  }

  private handleSplashScreen(): void {
    this.router.events
      .pipe(
        first((events) => events instanceof NavigationEnd),
        delay(500)
      )
      .subscribe(() => {
        this._removeSplashScreen();
      });
  }

  private _removeSplashScreen(): void {
    const intro = this.document.getElementById('splash-screen');
    if (!intro) {
      return;
    }
    intro.classList.add('is-destroying');

    const destroyingAnimationTime = 300;
    const stylesheet = this.document.getElementById('splash-screen-stylesheet');

    setTimeout(() => {
      DomUtils.remove(intro);
      DomUtils.remove(stylesheet);
    }, destroyingAnimationTime);
  }

  private readTitleConfig() {
    this.languageService.translate
      .get(this.configService.getConfig('title', ''))
      .subscribe((title) => {
        if (title) {
          this.titleService.setTitle(title);
          this.metaService.addTag({ name: 'title', content: title });
        }
      });
  }

  private setManifest() {
    if (this.configService.getConfig('app.install.enabled')) {
      const manifestPath = this.configService.getConfig(
        'app.install.manifestPath',
        'manifest.webmanifest'
      );
      document
        .querySelector('#igoManifestByConfig')
        .setAttribute('href', manifestPath);
    }
  }

  private installPrompt() {
    const appConfig: AppOptions = this.configService.getConfig('app');
    if (appConfig?.install?.enabled && appConfig?.install?.promote) {
      if (userAgent.getOSName() !== 'iOS') {
        window.addEventListener(
          'beforeinstallprompt',
          (event: any) => {
            event.preventDefault();
            this.promptEvent = event;
            window.addEventListener(
              'click',
              () => {
                setTimeout(() => {
                  this.promptEvent.prompt();
                  this.promptEvent = undefined;
                }, 750);
              },
              { once: true }
            );
          },
          { once: true }
        );
      }
    }
  }

  private readDescriptionConfig() {
    const description = this.configService.getConfig('description');
    if (description) {
      this.metaService.addTag({ name: 'description', content: description });
    }
  }

  private detectOldBrowser() {
    const oldBrowser = userAgent.satisfies({
      ie: '<=11',
      chrome: '<64',
      firefox: '<60',
      safari: '<=11'
    });

    if (oldBrowser) {
      this.messageService.alert('oldBrowser.message', 'oldBrowser.title', {
        timeOut: 15000
      });
    }
  }
}

import { DOCUMENT, NgClass, NgIf } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';

import { AuthOptions } from '@igo2/auth';
import { AuthFormComponent } from '@igo2/auth/form';
import {
  SpinnerActivityDirective,
  SpinnerComponent
} from '@igo2/common/spinner';
import { ConfigService } from '@igo2/core/config';
import { LanguageService } from '@igo2/core/language';
import { MessageService } from '@igo2/core/message';
import { AppOptions } from '@igo2/integration';
import { DomUtils, userAgent } from '@igo2/utils';

import { delay, first } from 'rxjs';

import { FooterComponent } from './pages/footer/footer.component';
import { HeaderComponent } from './pages/header/header.component';
import { PortalComponent } from './pages/portal/portal.component';
import { PwaService } from './services/pwa.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    SpinnerComponent,
    SpinnerActivityDirective,
    HeaderComponent,
    FooterComponent,
    NgIf,
    AuthFormComponent,
    PortalComponent,
    NgClass
  ]
})
export class AppComponent implements OnInit {
  public authConfig: AuthOptions;
  public hasHeader: boolean;
  public hasFooter: boolean;
  private promptEvent: any;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    protected languageService: LanguageService,
    private configService: ConfigService,
    private titleService: Title,
    private metaService: Meta,
    private messageService: MessageService,
    private pwaService: PwaService,
    private router: Router
  ) {
    this.authConfig = this.configService.getConfig('auth', {});

    this.readTitleConfig();
    this.readDescriptionConfig();

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

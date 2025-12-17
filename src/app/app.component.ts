import { Platform } from '@angular/cdk/platform';
import { Component, DOCUMENT, OnInit, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';

import { AuthOptions } from '@igo2/auth';
import { AuthFormComponent } from '@igo2/auth/form';
import {
  SpinnerActivityDirective,
  SpinnerComponent
} from '@igo2/common/spinner';
import { ConfigService } from '@igo2/core/config';
import { IgoLanguageModule, LanguageService } from '@igo2/core/language';
import { AppOptions } from '@igo2/integration';
import { IHeaderConfig } from '@igo2/sdg-common';
import { DomUtils } from '@igo2/utils';

import { delay, first } from 'rxjs';

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { PortalComponent } from './pages/portal/portal.component';
import { PwaService } from './services/pwa.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    SpinnerComponent,
    SpinnerActivityDirective,
    FooterComponent,
    AuthFormComponent,
    PortalComponent,
    HeaderComponent,
    IgoLanguageModule
  ]
})
export class AppComponent implements OnInit {
  private document = inject<Document>(DOCUMENT);
  private platform = inject(Platform);
  private languageService = inject(LanguageService);
  private configService = inject(ConfigService);
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private pwaService = inject(PwaService);
  private router = inject(Router);

  readonly lang = toSignal<string>(this.languageService.language$);

  authConfig: AuthOptions;
  header: IHeaderConfig;
  hasFooter: boolean;
  private promptEvent: any;

  constructor() {
    this.authConfig = this.configService.getConfig('auth', {});
    this.header = this.configService.getConfig('header');
    this.hasFooter = this.configService.getConfig('hasFooter', false);

    this.readTitleConfig();
    this.readDescriptionConfig();

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
      if (!this.platform.IOS) {
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
}

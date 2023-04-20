import { Component, Renderer2 } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { userAgent } from '@igo2/utils';
import {
  LanguageService,
  ConfigService,
  MessageService
} from '@igo2/core';
import { AuthOptions } from '@igo2/auth';
import { AnalyticsListenerService } from '@igo2/integration';
import { PwaService } from './services/pwa.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public authConfig: AuthOptions;
  private themeClass = 'blue-theme';
  public hasHeader = true;
  public hasFooter = true;
  private promptEvent: any;
  constructor(
    protected languageService: LanguageService,
    private configService: ConfigService,
    private analyticsListenerService: AnalyticsListenerService,
    private renderer: Renderer2,
    private titleService: Title,
    private metaService: Meta,
    private messageService: MessageService,
    private pwaService: PwaService // let there to be handled (based on configs: app.pwa.enabled)
  ) {
    this.authConfig = this.configService.getConfig('auth');

    this.readTitleConfig();
    this.readThemeConfig();
    this.readDescriptionConfig();

    this.analyticsListenerService.listen();

    this.detectOldBrowser();

    this.hasHeader = this.configService.getConfig('header.hasHeader') === undefined ? false :
    this.configService.getConfig('header.hasHeader');

    this.hasFooter = this.configService.getConfig('hasFooter') === undefined ? false :
    this.configService.getConfig('hasFooter');

    this.setManifest();
    this.installPrompt();
  }

  private readTitleConfig() {
    this.languageService.translate.get(this.configService.getConfig('title')).subscribe(title => {
      if (title) {
        this.titleService.setTitle(title);
        this.metaService.addTag({ name: 'title', content: title });
      }
    });
  }

  private setManifest() {
    const appConfig = this.configService.getConfig('app');
    if (appConfig?.install?.enabled) {
      const manifestPath = appConfig.install.manifestPath || 'manifest.webmanifest';
      document.querySelector('#igoManifestByConfig').setAttribute('href', manifestPath);
    }
  }

  private installPrompt() {
    const appConfig = this.configService.getConfig('app');
    if (appConfig?.install?.enabled && appConfig?.install?.promote) {
      if (userAgent.getOSName() !== 'iOS') {
        window.addEventListener('beforeinstallprompt', (event: any) => {
          event.preventDefault();
          this.promptEvent = event;
          window.addEventListener('click', () => {
            setTimeout(() => {
              this.promptEvent.prompt();
              this.promptEvent = undefined;
            }, 750);
          }, { once: true });
        }, { once: true });
      }
    }
  }


  private readThemeConfig() {
    const theme = this.configService.getConfig('theme') || this.themeClass;
    if (theme) {
      this.renderer.addClass(document.body, theme);
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

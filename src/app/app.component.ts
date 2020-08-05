import { Component, Renderer2 } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { zip } from 'rxjs';
import { map } from 'rxjs/operators';

import { userAgent } from '@igo2/utils';
import {
  LanguageService,
  ConfigService,
  AnalyticsService,
  MessageService
} from '@igo2/core';
import { AuthOptions } from '@igo2/auth';
import { AnalyticsListenerService } from '@igo2/integration';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public authConfig: AuthOptions;
  private themeClass = 'blue-theme';

  constructor(
    protected languageService: LanguageService,
    private configService: ConfigService,
    private analyticsService: AnalyticsService,
    private analyticsListenerService: AnalyticsListenerService,
    private renderer: Renderer2,
    private titleService: Title,
    private metaService: Meta,
    private messageService: MessageService
  ) {
    this.authConfig = this.configService.getConfig('auth');

    this.readTitleConfig();
    this.readThemeConfig();
    this.readDescriptionConfig();

    this.analyticsListenerService.listen();

    this.detectOldBrowser();
  }

  private readTitleConfig() {
    const title = this.configService.getConfig('title');
    if (title) {
      this.titleService.setTitle(title);
      this.metaService.addTag({ name: 'title', content: title });
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
      ie: '<11',
      chrome: '<64',
      firefox: '<60'
    });

    if (oldBrowser) {
      const translate = this.languageService.translate;
      const title$ = translate.get('oldBrowser.title');
      const message$ = translate.get('oldBrowser.message');
      zip(title$, message$)
        .pipe(
          map(([title, message]) => ({
            title,
            message
          }))
        )
        .subscribe((rep) =>
          this.messageService.alert(rep.message, rep.title, {
            timeOut: 15000
          })
        );
    }
  }
}

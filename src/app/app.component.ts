import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
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
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public authConfig: AuthOptions;
  private themeClass = 'blue-theme';
  public hasHeader = true;
  public HeaderComponent = HeaderComponent;
  public FooterComponent = FooterComponent;
  public hasFooter = true;
  @ViewChild('searchBar', { read: ElementRef, static: true })
  searchBar: ElementRef;

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
   this.languageService.translate.getTranslation(this.languageService.getLanguage()).subscribe();

    this.authConfig = this.configService.getConfig('auth');

    this.readTitleConfig();
    this.readThemeConfig();
    this.readDescriptionConfig();

    this.analyticsListenerService.listen();

    this.detectOldBrowser();

    this.hasHeader = this.configService.getConfig('header.hasHeader') === undefined ? false :
    this.configService.getConfig('header.hasHeader');

    this.hasFooter = this.configService.getConfig('header.hasFooter') === undefined ? false :
    this.configService.getConfig('header.hasFooter');
  }

  private readTitleConfig() {
    this.languageService.translate.get(this.configService.getConfig('title')).subscribe(title => {
      if (title) {
        this.titleService.setTitle(title);
        this.metaService.addTag({ name: 'title', content: title });
      }
    });
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

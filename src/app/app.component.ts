import { Component, Renderer2 } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

import { LanguageService, ConfigService, AnalyticsService } from '@igo2/core';
import { AuthOptions } from '@igo2/auth';

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
    private renderer: Renderer2,
    private titleService: Title,
    private metaService: Meta
  ) {
    this.authConfig = this.configService.getConfig('auth');

    const title = this.configService.getConfig('title');
    if (title) {
      this.titleService.setTitle(title);
      this.metaService.addTag({ name: 'title', content: title });
    }

    const theme = this.configService.getConfig('theme') || this.themeClass;
    if (theme) {
      this.renderer.addClass(document.body, theme);
    }

    const description = this.configService.getConfig('description');
    if (description) {
      this.metaService.addTag({ name: 'description', content: description });
    }
  }
}

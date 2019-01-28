import { Component, Renderer2 } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { LanguageService, ConfigService } from '@igo2/core';
import { AuthOptions } from '@igo2/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public authConfig: AuthOptions;

  constructor(
    protected languageService: LanguageService,
    private configService: ConfigService,
    private renderer: Renderer2,
    private titleService: Title
  ) {
    this.authConfig = this.configService.getConfig('auth');

    const title = this.configService.getConfig('title');
    if (title) {
      this.titleService.setTitle(title);
    }

    const themeClass = this.configService.getConfig('theme');
    if (themeClass) {
      this.renderer.addClass(document.body, themeClass);
    }
  }
}

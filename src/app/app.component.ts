import { Component } from '@angular/core';

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
    private configService: ConfigService
  ) {
    this.authConfig = this.configService.getConfig('auth');
  }
}

import { Component } from '@angular/core';
import { ConfigService, LanguageService } from '@igo2/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public title$: Observable<string> =
  of(this.configService.getConfig('Header.title') || this.configService.getConfig('title'));

  constructor(private configService: ConfigService,
    protected languageService: LanguageService) {}

  changeLanguage() {
    if (this.languageService.getLanguage() === 'fr'){
      this.languageService.setLanguage('en');
    } else {
      this.languageService.setLanguage('fr');
    }
  }

}

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
  of(this.configService.getConfig('headerTitle') || this.configService.getConfig('title'));

  public headerLogo$: Observable<string> =
  of(this.configService.getConfig('headerLogo') || this.configService.getConfig('header.logo'));

  public headerLogoPrint$: Observable<string> =
  of(this.configService.getConfig('headerLogoPrint') || this.configService.getConfig('header.logoPrint'));

  public contactUsUrl$: Observable<string> =
  of(this.configService.getConfig('contactUsUrl') || this.configService.getConfig('header.contactUsUrl'));


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

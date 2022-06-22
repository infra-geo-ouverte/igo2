import { Component } from '@angular/core';
import { ConfigService, LanguageService } from '@igo2/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public headerLogo: string;
  public headerLogoPrint: string;

  constructor(
    private configService: ConfigService,
    protected languageService: LanguageService) {
      this.computeHeader();
    }

  computeHeader() {
    this.headerLogo = this.configService.getConfig('header.logo');
    this.headerLogoPrint = this.configService.getConfig('header.logoPrint');
  }

  // Future translation system
  /*changeLanguage() {
    if (this.languageService.getLanguage() === 'fr'){
      this.languageService.setLanguage('en');
    } else {
      this.languageService.setLanguage('fr');
    }
  }*/

}

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
  public headerTitle: string;
  public headerContactUsUrl: string;

  constructor(
    private configService: ConfigService,
    protected languageService: LanguageService) {
      this.computeHeader();
    }


  computeHeader() {
    this.headerLogo = this.configService.getConfig('header.logo');
    this.headerLogoPrint = this.configService.getConfig('header.logoPrint');
    this.headerLogoPrint = this.configService.getConfig('header.logoPrint');
    this.headerTitle = this.configService.getConfig('title');
    this.headerContactUsUrl = this.configService.getConfig('header.contactUsUrl');
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

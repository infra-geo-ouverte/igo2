import { Component, OnInit } from '@angular/core';

import { ConfigService, LanguageService } from '@igo2/core';

import { SearchBarService } from 'src/app/services/search-bar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public headerLogo: string;
  public headerLogoPrint: string;
  searchBarOpened = false;

  constructor(
    private configService: ConfigService,
    protected languageService: LanguageService,
    private searchBarService: SearchBarService
  ) {
    this.computeHeader();
  }

  computeHeader() {
    this.headerLogo = this.configService.getConfig('header.logo');
    this.headerLogoPrint = this.configService.getConfig('header.logoPrint');
  }

  ngOnInit(): void {
    this.searchBarService.searchBarOpened.subscribe(
      (t) => (this.searchBarOpened = t)
    );
  }

  onToggleSearchBar() {
    this.searchBarService.toggle();
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

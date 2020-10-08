import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfigService, LanguageService } from '@igo2/core';
import { WelcomeWindowService } from './welcome-window.service';

@Component({
  selector: 'app-welcome-window',
  templateUrl: './welcome-window.component.html',
  styleUrls: ['./welcome-window.component.scss']
})
export class WelcomeWindowComponent {
  // isVisible = true;
  showAgain = false;
  public discoverTitleInLocale = this.configService.getConfig('title');

  constructor(
    public dialog: MatDialog,
    private welcomeWindowService: WelcomeWindowService,
    private configService: ConfigService,
    protected languageService: LanguageService
  ) { }

  closeWelcomeWindow() {
    this.dialog.closeAll();
  }

  get translationParameters() {
    let deltaDay = 0;
    let isDateParsable = true;
    let releaseDate = new Date(this.configService.getConfig('version.releaseDate'));

    const releaseDateAppConfig = this.configService.getConfig('version.releaseDateApp');


    if (releaseDateAppConfig) {
      const releaseDateApp = new Date(releaseDateAppConfig);
      if (isNaN(releaseDateApp.getDate())) {
        console.log('The releaseDateApp config is not a valid date format');
        isDateParsable = false;
      } else {
        deltaDay = 1;
        releaseDate = releaseDateApp;
      }
    }

    let releaseDateString = '';

    if (isDateParsable) {
      let day: any = releaseDate.getDate() + deltaDay;
      if (day < 10) {
        day = '0' + day;
      }
      let month: any = releaseDate.getMonth() + 1;
      if (month < 10) {
        month = '0' + month;
      }
      const year = releaseDate.getFullYear();
      releaseDateString = `${year}-${month}-${day}`;
    } else {
      releaseDateString = releaseDateAppConfig;
    }

    return {
      title: this.configService.getConfig('title') || '',
      description: this.configService.getConfig('description') || '',
      version: this.configService.getConfig('version.app') || this.configService.getConfig('version.lib') || '',
      releaseDate: releaseDateString || ''
    };

  }

  get html() {
    return 'welcomeWindow.html';
  }

  setShowAgain() {
    this.welcomeWindowService.showAgain = this.showAgain;
  }
}

import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfigService, version } from '@igo2/core';
import { WelcomeWindowService } from './welcome-window.service';
import { ObjectUtils } from '@igo2/utils';

@Component({
  selector: 'app-welcome-window',
  templateUrl: './welcome-window.component.html',
  styleUrls: ['./welcome-window.component.scss']
})
export class WelcomeWindowComponent {
  // isVisible = true;
  showAgain = false;

  constructor(
    public dialog: MatDialog,
    private welcomeWindowService: WelcomeWindowService,
    private configService: ConfigService
  ) { }

  closeWelcomeWindow() {
    this.dialog.closeAll();
  }

  get translationParameters() {
    const releaseDate = new Date(version.releaseDate);
    let day: any = releaseDate.getDate();
    if (day < 10) {
      day = '0' + day;
    }
    const releaseDateString = `${releaseDate.getFullYear()}-${releaseDate.getMonth() + 1}-${day}`;
    return ObjectUtils.removeUndefined(
      {
        title: this.configService.getConfig('title'),
        description: this.configService.getConfig('description'),
        version: this.configService.getConfig('version') || version.lib,
        releaseDate: this.configService.getConfig('releaseDate') || releaseDateString
      });
  }

  get html() {
    return 'welcomeWindow.html';
  }

  setShowAgain() {
    this.welcomeWindowService.showAgain = this.showAgain;
  }
}

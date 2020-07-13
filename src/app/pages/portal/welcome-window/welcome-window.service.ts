import { Injectable } from '@angular/core';
import {
  ConfigService
} from '@igo2/core';
import {MatDialogConfig} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class WelcomeWindowService {

  // private html:string = 'igo.htmlWelcomeWindow';

  constructor(private configService: ConfigService) { }

  hasWelcomeWindow() {
    return this.configService.getConfig('hasWelcomeWindow');
  }

  // getHtml() {
  // }

  getConfig(): MatDialogConfig {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.maxWidth = '500px';

    return dialogConfig;
  }

}

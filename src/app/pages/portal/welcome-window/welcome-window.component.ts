import { Component, } from '@angular/core';
import {MatDialog } from '@angular/material';
import { WelcomeWindowService } from './welcome-window.service';

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
    private welcomeWindowService: WelcomeWindowService) {}

  closeWelcomeWindow() {
    console.log('ferme fenetre');
    this.dialog.closeAll();
}

  get html() {
    const _html: string = 'welcomeWindow.html';
    return _html;
  }

  setShowAgain() {
    this.welcomeWindowService.showAgain = this.showAgain;
    console.log(this.showAgain);

  }


}


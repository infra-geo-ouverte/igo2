import { Component, OnInit, Input } from '@angular/core';
// import { MessageService } from '@igo2/core';
import {MatDialog, MatDialogConfig} from '@angular/material';

@Component({
  selector: 'app-welcome-window',
  templateUrl: './welcome-window.component.html',
  styleUrls: ['./welcome-window.component.scss']
})
export class WelcomeWindowComponent implements OnInit {

  isVisible = true;

  // private defaultOptions = {
  //   position: ['top', 'center'],
  //   timeOut: 50000,
  //   hasCloseIcon: false,
  //   showProgressBar: true,
  //   pauseOnHover: true,
  //   clickToClose: true,
  //   maxLength: 100,
  //   maxStack: 3,
  //   preventDuplicates: true,
  //   preventLastDuplicates: 'all'
  // };

  // options = {
  //   position: ["bottom", "right"],
  //   lastOnBottom: true,
  //   animate: 'fromRight',
  //   timeOut: 20000,
  //   showProgressBar: false,
  //   pauseOnHover: true,
  //   clickToClose: false
  // };

  // @Input()
  // get options(): any {
  //   return this.defaultOptions;
  // }

  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
    // this.create();
  }

	create() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    // dialogConfig.width = '200';
    dialogConfig.minHeight = 2000;
    dialogConfig.maxWidth = '200px';
    dialogConfig.height = '1050px';
    dialogConfig.disableClose = true;


    // this.dialog.open(DialogElementsExampleDialog, dialogConfig);
    this.dialog.open(WelcomeWindowComponent, dialogConfig);
  //   this.dialog.open(WelcomeWindowComponent, {
  //     hasBackdrop: true,
  //     position: 'top',
  //   });
  }

  closeWelcomeWindow() {
    console.log('ferme fenetre');
    this.dialog.closeAll();
}



  get html() {

    const _html: string = 'welcomeWindow.html';
    // const _html2: string = 'igo.htmWelcomeWindow';
    // return '<h4>Ca marche!!!</h4>';
    return _html;
  }

  doNotShowCheck() {
    console.log('check!!!');
  }


}


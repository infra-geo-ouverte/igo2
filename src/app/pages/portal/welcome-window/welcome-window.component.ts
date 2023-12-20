import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogClose,
  MatDialogContent
} from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';

import { CustomHtmlComponent, InteractiveTourComponent } from '@igo2/common';
import { ConfigService, LanguageService } from '@igo2/core';

import { TranslateModule } from '@ngx-translate/core';
import { BehaviorSubject, Observable, Subscription, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { getAppVersion } from 'src/app/app.utils';

import { WelcomeWindowService } from './welcome-window.service';

@Component({
  selector: 'app-welcome-window',
  templateUrl: './welcome-window.component.html',
  styleUrls: ['./welcome-window.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    MatToolbarModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogContent,
    CustomHtmlComponent,
    InteractiveTourComponent,
    MatButtonModule,
    MatDialogClose,
    TranslateModule,
    AsyncPipe
  ]
})
export class WelcomeWindowComponent implements OnInit, OnDestroy {
  // isVisible = true;
  showAgain = false;
  public discoverTitleInLocale$: Observable<string>;
  private title$$: Subscription;
  public html$: BehaviorSubject<string> = new BehaviorSubject(undefined);

  constructor(
    public dialog: MatDialog,
    private welcomeWindowService: WelcomeWindowService,
    private configService: ConfigService,
    protected languageService: LanguageService
  ) {
    this.discoverTitleInLocale$ = of(
      this.configService.getConfig(
        'welcomeWindow.discoverTitleInLocale',
        this.configService.getConfig('title')
      )
    );
  }

  ngOnInit(): void {
    this.computeHtml();
  }

  closeWelcomeWindow() {
    this.dialog.closeAll();
  }

  private computeHtml() {
    let deltaDay = 0;
    let isDateParsable = true;
    let releaseDate = new Date(
      this.configService.getConfig('version.releaseDate')
    );

    const releaseDateAppConfig = this.configService.getConfig(
      'version.releaseDateApp'
    );

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

    this.title$$ = this.languageService.translate
      .get(this.configService.getConfig('title', ''))
      .pipe(
        map((title) => {
          return this.languageService.translate.instant('welcomeWindow.html', {
            title,
            description: this.configService.getConfig('description', ''),
            version: getAppVersion(this.configService),
            releaseDate: releaseDateString || ''
          });
        })
      )
      .subscribe((r) => this.html$.next(r));

    return this.html$;
  }

  setShowAgain() {
    this.welcomeWindowService.showAgain = this.showAgain;
  }

  ngOnDestroy(): void {
    if (this.title$$) {
      this.title$$.unsubscribe();
    }
  }
}

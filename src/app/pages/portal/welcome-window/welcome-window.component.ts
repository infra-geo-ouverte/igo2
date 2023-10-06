import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfigService, LanguageService } from '@igo2/core';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { WelcomeWindowService } from './welcome-window.service';
import { getAppVersion } from 'src/app/app.utils';

@Component({
  selector: 'app-welcome-window',
  templateUrl: './welcome-window.component.html',
  styleUrls: ['./welcome-window.component.scss']
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
      this.configService.getConfig('welcomeWindow.discoverTitleInLocale') ||
        this.configService.getConfig('title')
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
      .get(this.configService.getConfig('title') || '')
      .pipe(
        map((title) => {
          return this.languageService.translate.instant('welcomeWindow.html', {
            title,
            description: this.configService.getConfig('description') || '',
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
